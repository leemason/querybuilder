var _ = require('lodash');

module.exports = {

    union: function(builder){
        this._method = 'Union';
        if(!_.isFunction(builder)){
            this._union.push(builder);
            this._bindings = this._bindings.concat(builder.getBindings());
        }else{
            var b = this.createBuilder();
            builder(b);
            this._union.push(b);
            this._bindings = this._bindings.concat(b.getBindings());
        }

        return this;
    },

    unionAll: function(builder){
        this._method = 'UnionAll';

        if(!_.isFunction(builder)){
            this._unionAll.push(builder);
            this._bindings = this._bindings.concat(builder.getBindings());
        }else{
            var b = this.createBuilder();
            builder(b);
            this._unionAll.push(b);
            this._bindings = this._bindings.concat(b.getBindings());
        }

        return this;
    }
}