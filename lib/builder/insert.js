var _ = require('lodash');

module.exports = {

    insert: function(data){
        this._method = 'Insert';
        if(!_.isArray(data)){
            data = [data];
        }
        return this._insert = data;
    },

    getInsertBindings: function(){
        return _.flattenDeep(_.map(this._insert, function(value){
            return _.values(value);
        }));
    }
}