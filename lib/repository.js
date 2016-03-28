var Builder = require('./builder'),
    _ = require('lodash'),
    EventEmitter = require('events'),
    util = require('util'),
    Promise = require('bluebird');

var Repository = function(){

    EventEmitter.call(this);

    Builder.call(this);

    this.table(this.tableName);

}

util.inherits(Repository, EventEmitter);

util.inherits(Repository, Builder);

_.extend(Repository.prototype, {

    tableName: null,

    model: null,

    connection: null,

    resetBuilder: function(){
        this.reset();
        this.table(this.tableName);
        return this;
    },

    _query: function(){
        var sql = this.toSql(this.connection._config.driver),
            bindings = this.getBindings();
        console.log(this.toString(this.connection._config.driver));
        this.resetBuilder();
        return this.connection.rawQuery(sql, bindings);
    },

    get: function(){

        return this._query().then(function(results){
            return _.map(results, function(row){
               return new this.model(row);
            }.bind(this));
        }.bind(this));
    },

    all: function(){
        this.resetBuilder();
        return this.get();
    },

    first: function(){

        this.take(1);

        return this._query().then(function(results){
            return new this.model(results[0]);
        }.bind(this));
    },

    find: function(id){

        this.resetBuilder()
            .where(this.model.prototype.idAttribute, id)
            .take(1);

        return this._query().then(function(results){
            this.resetBuilder();
            return new this.model(results[0]);
        }.bind(this));
    },

    save: function(model){

        if(model.isNew()){
            this.resetBuilder().insert(model.toJSON());
            return this._query();
        }

        if(model.isDirty()){
            var data = _.omit(model.changed, this.model.prototype.idAttribute);

            this.resetBuilder()
                .where(this.model.prototype.idAttribute, model.getPk())
                .update(data);

            return this._query();
        }

        return new Promise(function(resolve,reject){
            resolve(false);
        });
    }

});

Repository.extend = function(proto){

    var parent = this;
    var repo;

    if (proto && proto.hasOwnProperty('constructor')) {
        repo = proto.constructor;
    } else {
        repo = function(){
            return parent.apply(this, arguments);
        };
    }

    _.extend(repo, parent, proto);

    repo.prototype = _.create(parent.prototype, proto);
    repo.prototype.constructor = repo;

    repo.super_ = parent.prototype;

    return repo;
}

module.exports = Repository;