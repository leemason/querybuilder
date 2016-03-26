var _ = require('lodash');

module.exports = {

    count: function(){
        this._count = Array.prototype.slice.call(arguments);
        //if no args add default count(*)
        if(this._count.length == 0){
            this._count.push('*');
        }
        return this;
    },

    countDistinct: function(){
        this._countDistinct = Array.prototype.slice.call(arguments);
        //if no args add default count(*)
        if(this._countDistinct.length == 0){
            this._countDistinct.push('*');
        }
        return this;
    },
}