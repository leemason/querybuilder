var _ = require('lodash');

var Join = new function(){
    this._args = Array.prototype.slice.call(arguments);

    this._table = this._args[0];

}

module.exports = Join;
