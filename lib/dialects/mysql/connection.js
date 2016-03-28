var BaseConnection = require('./../../connection'),
    util = require('util'),
    mysql = require('mysql'),
    Promise = require("bluebird");

var Connection = function(config){
    BaseConnection.call(this, config);
}

util.inherits(Connection, BaseConnection);

Connection.prototype.createConnection = function(){
    this._connection = mysql.createConnection({
        host: this._config.connection.host,
        user: this._config.connection.user,
        password: this._config.connection.password,
        database: this._config.connection.database
    });
}

module.exports = Connection;