var _ = require('lodash');

module.exports = {

    compileWhere: function(root){

        var statements = [];

        if(this._builder._where.length > 0) {

            statements.push(root === true ? 'where' : '');

            this._builder._where.forEach(function (clause, index, wheres) {

                var where = this['compileWhere' + clause.type](clause);

                statements.push(where.sql);

                statements.push(this.addWhereConnector(index, wheres));

            }.bind(this));
        }

        return _.compact(statements).join(' ');
    },


    addWhereConnector: function(index, wheres){

        var i = index + 1;
        if(wheres[i] == undefined){
            return '';
        }

        return wheres[i].connector;
    },

    compileWhereBasic: function(clause){
        return {
            sql: this.escapeId(clause.column) + ' ' + clause.operator + ' ?'
        };
    },

    compileWhereAnd: function(clause){
        return {
            sql: '(' + clause.builder.compileWhere(this._dialect) + ')'
        };
    },

    compileWhereOr: function(clause){
        return {
            sql: '(' + clause.builder.compileWhere(this._dialect) + ')'
        };
    },

    compileWhereBetween: function(clause){
        return {
            sql: this.escapeId(clause.column) + ' between ? and ?'
        };
    },

    compileWhereNotBetween: function(clause){
        return {
            sql: this.escapeId(clause.column) + ' not between ? and ?'
        };
    },

    compileWhereIn: function(clause){
        return {
            sql: this.escapeId(clause.column) + ' in ( ? )'
        };
    },

    compileWhereNotIn: function(clause){
        return {
            sql: this.escapeId(clause.column) + ' not in ( ? )'
        };
    },

    compileWhereNull: function(clause){
        return {
            sql: this.escapeId(clause.column) + ' is null'
        };
    },

    compileWhereNotNull: function(clause){
        return {
            sql: this.escapeId(clause.column) + ' is not null'
        };
    },

    compileWhereExists: function(clause){
        return {
            sql: 'exists (' + clause.builder.toSql(this._dialect).slice(0, -1) + ')'
        };
    },

    compileWhereRaw: function(clause){
        return {
            sql: clause.value
        };
    }
};