var Builder = require('./builder'),
    util = require('util'),
    Promise = require("bluebird");

var Connection = function(config){
    Builder.call(this);
    this._config = config;

    this.createConnection();
}

util.inherits(Connection, Builder);


Connection.prototype.rawQuery = function(sql, bindings){
    return new Promise(function(resolve,reject){
        this._connection.query(sql, bindings, function (err, results, fields) {

            if(err !== null) return reject(err);

            resolve(results, fields);
        });
    }.bind(this));
}

Connection.prototype.execute = function(){
    return this.rawQuery(this.toSql(this._config.driver), this.getBindings());
}

Connection.prototype.get = function(){
    return this.execute();
}

Connection.prototype.insert = function(){
    Connection.super_.prototype.insert.apply(this, arguments);
    return this.execute();
}

Connection.prototype.update = function(){
    Connection.super_.prototype.update.apply(this, arguments);
    return this.execute();
}

Connection.prototype.delete = function(){
    Connection.super_.prototype.delete.apply(this, arguments);
    return this.execute();
}

Connection.prototype.truncate = function(){
    Connection.super_.prototype.truncate.apply(this, arguments);
    return this.execute();
}

Connection.prototype.first = function(){
    return new Promise(function(resolve,reject){
        //alter to query to limit to 1 row
        this
            .take(this._start + 1)
            .get()
            .then(function(results, fields){
                resolve(results[0]);
            }).catch(function(err){
                reject(err);
            });
    }.bind(this));
}

module.exports = Connection;