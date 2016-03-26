var _ = require('lodash');

module.exports = {

    compileTruncate: function(){

        var statements = [];

        statements.push('truncate');
        statements.push(this.table());

        return _.compact(statements).join(' ') + ';';
    }
}