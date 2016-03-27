var _ = require('lodash')
    JoinClause = require('./clauses/join');

module.exports = {

    join: function(){

        this._joins.push(Array.prototype.slice.call(arguments));

        return this;
    },

    innerJoin: function(){
        this._joins.push(Array.prototype.slice.call(arguments));

        return this;
    },

    leftJoin: function(){

        this._leftJoins.push(Array.prototype.slice.call(arguments));

        return this;
    },

    leftOuterJoin: function(){

        this._leftOuterJoins.push(Array.prototype.slice.call(arguments));

        return this;
    },

    rightJoin: function(){

        this._rightJoins.push(Array.prototype.slice.call(arguments));

        return this;
    },

    rightOuterJoin: function(){

        this._rightOuterJoins.push(Array.prototype.slice.call(arguments));

        return this;
    },

    outerJoin: function(){

        this._outerJoins.push(Array.prototype.slice.call(arguments));

        return this;
    },

    fullOuterJoin: function(){

        this._fullOuterJoins.push(Array.prototype.slice.call(arguments));

        return this;
    },

    crossJoin: function(){

        this._crossJoins.push(Array.prototype.slice.call(arguments));

        return this;
    },

    joinRaw: function(join, bindings){

        this._rawJoins.push(join);

        this._bindings = this._bindings.concat(bindings);

        return this;
    }
}