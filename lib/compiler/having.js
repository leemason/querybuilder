var _ = require('lodash');

module.exports = {

    compileHaving: function(root){

        var statements = [];

        if(this._builder._having.length > 0) {

            statements.push(root === true ? 'having' : '');

            this._builder._having.forEach(function (clause, index, havings) {

                var having = this['compileHaving' + clause.type](clause);

                statements.push(having.sql);

                statements.push(this.addHavingConnector(index, havings));

            }.bind(this));
        }

        return _.compact(statements).join(' ');
    },

    addHavingConnector: function(index, havings){

        var i = index + 1;
        if(havings[i] == undefined){
            return '';
        }

        return havings[i].connector;
    },

    compileHavingBasic: function(clause){
        return {
            sql: this.escapeId(clause.column) + ' ' + clause.operator + ' ?'
        };
    },

    compileHavingAnd: function(clause){
        return {
            sql: '(' + clause.builder.compileHaving(this._dialect) + ')'
        };
    },

    compileHavingOr: function(clause){
        return {
            sql: '(' + clause.builder.compileHaving(this._dialect) + ')'
        };
    },

    compileHavingRaw: function(clause){
        return {
            sql: clause.value
        };
    }
}