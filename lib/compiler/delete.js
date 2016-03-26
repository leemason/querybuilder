var _ = require('lodash');

module.exports = {

    compileDelete: function(){

        var statements = [];

        statements.push('delete from');
        statements.push(this.table());

        statements.push(this.compileWhere(true));

        statements.push(this.compileOrderBy());

        statements.push(this.compileLimit());

        return _.compact(statements).join(' ') + ';';
    }
}