var _ = require('lodash');

var Compiler = function(builder, dialect){
    this._builder = builder;
    this._dialect = dialect;
};

_.assign(Compiler.prototype, require('./compiler/select'));

_.assign(Compiler.prototype, require('./compiler/where'));

_.assign(Compiler.prototype, require('./compiler/having'));

_.assign(Compiler.prototype, require('./compiler/insert'));

_.assign(Compiler.prototype, require('./compiler/update'));

_.assign(Compiler.prototype, require('./compiler/delete'));

_.assign(Compiler.prototype, require('./compiler/truncate'));

_.assign(Compiler.prototype, require('./compiler/union'));

_.assign(Compiler.prototype, require('./compiler/joins'));

_.assign(Compiler.prototype, require('./compiler/misc'));

module.exports = Compiler;