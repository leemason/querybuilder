var _ = require('lodash'),
    Escaper = require('./escaper'),
    e = new Escaper();

var Binder = function(){
    this._string = '';
    this._bindings = [];
};

Binder.prototype.prepare = function(string, bindings){
    this._string = string;
    this._bindings = bindings == null ? [] : [].concat(bindings);

    var index = 0;
    return this._string.replace(/\?\??/g, function(match) {
        if (index === this._bindings.length) {
            return match;
        }

        var value = this._bindings[index++];

        return match === '??'
            ? e.escapeId(value)
            : e.escape(value);
    }.bind(this));
}

module.exports = Binder;