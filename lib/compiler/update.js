var _ = require('lodash');

module.exports = {

    compileUpdate: function(){

        var statements = [];

        statements.push('update');
        statements.push(this.table());
        statements.push('set');

        var update = [];
        for (var key in this._builder._update) {
            update.push(this.escapeId(key) + ' = ?');
        }

        statements.push(update.join(', '));

        statements.push(this.compileWhere(true));

        statements.push(this.compileOrderBy());

        statements.push(this.compileLimit());

        return _.compact(statements).join(' ') + ';';
    }
}