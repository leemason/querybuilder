var compiler = require('./../../compiler'),
    util = require('util');

var mysql = function(builder, dialect) {
    compiler.call(this, builder, dialect)
}

util.inherits(mysql, compiler);

module.exports = mysql;