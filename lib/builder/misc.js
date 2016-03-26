var _ = require('lodash');

module.exports = {

    table: function(table){
        this._table = table;
        return this;
    },

    from: function(table){
        return this.table(table);
    },

    select: function(){
        var args = Array.prototype.slice.call(arguments);
        this._select = args;
        this._method = 'Select';
        return this;
    },

    distinct: function(){
        this._distinct = true;
        this._method = 'Select';
        return this;
    },

    orderBy: function(column, direction){
        this._orderBy.push([column, direction ? direction : 'desc']);
        return this;
    },

    orderByRaw: function(raw){
        this._orderByRaw = raw;
        return this;
    },

    groupBy: function(){
        var args = Array.prototype.slice.call(arguments);
        this._groupBy = _.compact(this._groupBy.concat(args));
        return this;
    },

    groupByRaw: function(raw){
        this._groupByRaw = raw;
        return this;
    },

    skip: function(skip){
        this._start = skip;
        return this;
    },

    take: function(take){
        this._end = take;
        return this;
    },

    limit: function(start, end){
        this.skip(start);
        this.take(end);
        return this;
    },

    delete: function(){
        this._method = 'Delete';
        return this;
    }
}