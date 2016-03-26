var _ = require('lodash');

module.exports = {

    whereRaw: function(condition, bindings){

        var where = {
            type: 'Raw',
            value: condition,
            connector: 'and'
        };

        this._where.push(where);

        if(bindings !== undefined){
            bindings.forEach(function(binding){
                this._bindings.push(binding);
            }.bind(this));
        }

        return this;
    },

    where: function(){

        //build the where object, allow for where(column, value) and where(column, operator, value)
        var where = {
            type: 'Basic',
            column: arguments[0],
            operator: arguments.length == 3 ? arguments[1] : '=',
            value: arguments.length == 3 ? arguments[2] : arguments[1],
            connector: 'and'
        };

        this._bindings.push(where.value);

        this._where.push(where);

        return this;
    },

    andWhere: function(callback){
        var newBuilder = this.createBuilder();
        callback(newBuilder);
        var where = {
            type: 'And',
            builder: newBuilder,
            connector: 'and'
        };
        this._where.push(where);

        newBuilder.getBindings().forEach(function(binding){
            this._bindings.push(binding);
        }.bind(this));

        return this;
    },

    orWhere: function(callback){
        var newBuilder = this.createBuilder();
        callback(newBuilder);
        var where = {
            type: 'Or',
            builder: newBuilder,
            connector: 'or'
        };
        this._where.push(where);

        newBuilder.getBindings().forEach(function(binding){
            this._bindings.push(binding);
        }.bind(this));

        return this;
    },

    whereBetween: function(column, value){

        var where = {
            type: 'Between',
            column: column,
            value: value,
            connector: 'and'
        };

        this._bindings.push(value[0]);
        this._bindings.push(value[1]);

        this._where.push(where);
        return this;
    },

    whereNotBetween: function(column, value){
        var where = {
            type: 'NotBetween',
            column: column,
            value: value,
            connector: 'and'
        };

        this._bindings.push(value[0]);
        this._bindings.push(value[1]);

        this._where.push(where);
        return this;
    },

    whereIn: function(column, value){
        var where = {
            type: 'In',
            column: column,
            value: value,
            connector: 'and'
        };

        this._bindings.push(value.join(', '));

        this._where.push(where);
        return this;
    },

    whereNotIn: function(column, value){
        var where = {
            type: 'NotIn',
            column: column,
            value: value,
            connector: 'and'
        };

        this._bindings.push(value.join(', '));

        this._where.push(where);
        return this;
    },

    whereNull: function(column){
        var where = {
            type: 'Null',
            column: column,
            connector: 'and'
        };

        this._where.push(where);
        return this;
    },

    whereNotNull: function(column){
        var where = {
            type: 'NotNull',
            column: column,
            connector: 'and'
        };

        this._where.push(where);
        return this;
    },

    whereExists: function(callback){
        var newBuilder = this.createBuilder();
        callback(newBuilder);
        var where = {
            type: 'Exists',
            builder: newBuilder,
            connector: 'and'
        };
        this._where.push(where);

        newBuilder.getBindings().forEach(function(binding){
            this._bindings.push(binding);
        }.bind(this));

        return this;
    },

    compileWhere: function(dialect){
        return this.compiler(dialect).compileWhere();
    }
};