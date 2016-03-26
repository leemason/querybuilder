var _ = require('lodash');

module.exports = {

    havingRaw: function(condition, bindings){

        var having = {
            type: 'Raw',
            value: condition,
            connector: 'and',
            bindings: bindings
        };

        this._having.push(having);

        return this;
    },

    having: function(){

        //build the where object, allow for where(column, value) and where(column, operator, value)
        var having = {
            type: 'Basic',
            column: arguments[0],
            operator: arguments.length == 3 ? arguments[1] : '=',
            value: arguments.length == 3 ? arguments[2] : arguments[1],
            connector: 'and',
        };

        having.bindings = [having.value];

        this._having.push(having);

        return this;
    },

    andHaving: function(callback){
        var newBuilder = this.createBuilder();
        callback(newBuilder);
        var having = {
            type: 'And',
            builder: newBuilder,
            connector: 'and',
            bindings: []
        };

        newBuilder.getHavingBindings().forEach(function(binding){
            having.bindings.push(binding);
        }.bind(this));

        this._having.push(having);

        return this;
    },

    orHaving: function(callback){
        var newBuilder = this.createBuilder();
        callback(newBuilder);
        var having = {
            type: 'Or',
            builder: newBuilder,
            connector: 'or',
            bindings: []
        };

        newBuilder.getHavingBindings().forEach(function(binding){
            having.bindings.push(binding);
        }.bind(this));

        this._having.push(having);

        return this;
    },

    getHavingBindings: function(){
        return _.flatMap(this._having, function(having){
            return having.bindings;
        });
    },

    compileHaving: function(dialect){
        return this.compiler(dialect).compileHaving();
    }
}