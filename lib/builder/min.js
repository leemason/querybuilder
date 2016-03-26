var _ = require('lodash');

module.exports = {

    min: function(){
        var args = Array.prototype.slice.call(arguments);
        //if no args add default min(id)
        if(args.length > 0){
            this._min = args;
        }
        return this;
    }
}