var Builder = require('./builder'),
    util = require('util'),
    mysql = require('mysql'),
    Promise = require("bluebird");

var Connection = function(config){
    Builder.call(this);
    this._config = config;

    this._connection = mysql.createConnection({
        host: config.connection.host,
        user: config.connection.user,
        password: config.connection.password,
        database: config.connection.database
    });
}

util.inherits(Connection, Builder);

Connection.prototype.execute = function(){
    return new Promise(function(resolve,reject){
        this._connection.query(this.toSql(this._config.driver), this.getBindings(), function (err, results, fields) {

            if(err !== null) return reject(err);

            resolve(results, fields);
        });
    }.bind(this));
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

module.exports = Connection;