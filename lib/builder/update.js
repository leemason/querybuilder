var _ = require('lodash');

module.exports = {

    update: function(data){
        this._method = 'Update';
        this._update = data;
        return this;
    },

    getUpdateBindings: function(){
        return _.values(this._update);
    }
}