var config = require('config'),
    Connection = require('./connection'),
    _ = require('lodash');

config.util.setModuleDefaults('database', {
    default: 'default',
    connections: {
        default: {
            driver: "mysql",
            connection: {
                host: "127.0.0.1",
                user: "root",
                password: "",
                database: "fluentjs",
                charset: "utf8"
            },
            pool: {
                min: 2,
                max: 10
            },
            migrations: {
                table: "migrations"
            },
            seeds: {
                directory: "./seeds"
            }
        }
    }
});

var Manager = function(){
    this._connections = {};
}

Manager.prototype.connection = function(conn){
    if(conn){
        if(this._connections.hasOwnProperty(conn)){
            return this._connections[conn];
        }
        this._connections[conn] = this.buildConnection(config.get('database.connections.' + conn));
        return this._connections[conn];
    }
    return this.connection(config.get('database.default'));
}

Manager.prototype.buildConnection = function(conf){
    var method = 'build' + _.upperFirst(conf.driver) + 'Connection';
    return new Connection(conf);
}

Manager.prototype.buildMysqlConnection = function(conf){
    return new Connection(conf);
}

module.exports = Manager;