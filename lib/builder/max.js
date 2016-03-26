var _ = require('lodash');

module.exports = {

    max: function(){
        var args = Array.prototype.slice.call(arguments);
        //if no args add default min(id)
        if(args.length > 0){
            this._max = args;
        }
        return this;
    }
}