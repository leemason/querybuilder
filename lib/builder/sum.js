var _ = require('lodash');

module.exports = {

    sum: function(){
        this._sum = Array.prototype.slice.call(arguments);
        //if no args add default sum(*)
        if(this._sum.length == 0){
            this._sum.push('*');
        }
        return this;
    },

    sumDistinct: function(){
        this._sumDistinct = Array.prototype.slice.call(arguments);
        //if no args add default sum(*)
        if(this._sumDistinct.length == 0){
            this._sumDistinct.push('*');
        }
        return this;
    },
}