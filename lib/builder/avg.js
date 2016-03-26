var _ = require('lodash');

module.exports = {

    avg: function(){
        this._avg = Array.prototype.slice.call(arguments);
        //if no args add default avg(*)
        if(this._avg.length == 0){
            this._avg.push('*');
        }
        return this;
    },

    avgDistinct: function(){
        this._avgDistinct = Array.prototype.slice.call(arguments);
        //if no args add default avg(*)
        if(this._avgDistinct.length == 0){
            this._avgDistinct.push('*');
        }
        return this;
    },
}