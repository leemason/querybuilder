var _ = require('lodash');

module.exports = {

    compileInsert: function(){

        var statements = [];

        statements.push('insert into');
        statements.push(this.table());

        var first = this._builder._insert[0];
        statements.push('(' + _.map(_.keys(first), function(key){return this.escapeId(key);}.bind(this)).join(',') + ')');

        statements.push('values');

        statements.push(_.map(this._builder._insert, function(values){
            return '(' + _.map(values, function(value){return '?';}).join(',') + ')';
        }).join(','));

        return _.compact(statements).join(' ') + ';';
    }
}