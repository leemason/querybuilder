var _ = require('lodash'),
    EventEmitter = require('events'),
    util = require('util');

var Model = function(attributes){

    EventEmitter.call(this);

    var attrs = attributes || {};

    this._attributes = {};

    if(attrs.hasOwnProperty(this.idAttribute)){
        this._attributes[this.idAttribute] = attrs[this.idAttribute];
    }

    this.mapAttributes.apply(this, [attrs]);

    this.initialize.apply(this);

}

util.inherits(Model, EventEmitter);

_.extend(Model.prototype, {

    _attributes: {},

    attributes: {
        id: 'Number'
    },

    original: {},

    changed: {},

    // The default name for the JSON `id` attribute is `"id"`. MongoDB and
    // CouchDB users may want to set this to `"_id"`.
    idAttribute: 'id',

    mapAttributes: function(attr){
        _.forIn(this.attributes, function(value, key){

            if(attr.hasOwnProperty(key)) {
                var type = _.capitalize(_.isString(value) ? value : (value.type || 'String'));
                var _method = 'is' + type;
                if (_[_method](attr[key])) {
                    this.original[key] = attr[key];
                    this._attributes[key] = attr[key];
                }else{
                    throw 'The ' + key + ' attribute must be a ' + type;
                }
            }else{
                var _default = value.default || '';
                this._attributes[key] = _default;
            }

            Object.defineProperty(this, key, {
                get: function proxyGetter () {
                    return this.get(key);
                }.bind(this),
                set: function proxySetter (val) {
                    return this.set(key, val);
                }.bind(this)
            });

        }.bind(this));
    },

    initialize: function(){},

    getPk: function(){
        return this.get(this.idAttribute);
    },

    get: function(attribute){
        return this._attributes[attribute];
    },

    set: function(attribute, value){

        if(attribute == this.idAttribute){
            return this;
        }

        if(value != this._attributes[attribute]){
            this.changed[attribute] = value;
            this.emit('changed', attribute, value, this._attributes[attribute]);
            this._attributes[attribute] = value;
        }
        return this;
    },

    has: function(attr) {
        return this.get(attr) != null;
    },

    isNew: function() {
        return !this.has(this.idAttribute);
    },

    isDirty: function(){
        return ! _.isEmpty(this.changed);
    },

    toJSON: function(){
        return this._attributes;
    }
});

Model.extend = function(proto){

    var parent = this;
    var model;

    if (proto && proto.hasOwnProperty('constructor')) {
        model = proto.constructor;
    } else {
        model = function(){
            return parent.apply(this, arguments);
        };
    }

    _.extend(model, parent, proto);

    model.prototype = _.create(parent.prototype, proto);
    model.prototype.constructor = model;

    model.super_ = parent.prototype;

    return model;
}

module.exports = Model;