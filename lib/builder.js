var _ = require('lodash');

var Builder = function(){

    this._method = 'Select';

    this._table = '';

    this._select = ['*'];

    this._where = [];

    this._orderBy = [];

    this._start = 0;
    this._end = 0;

    this._insert = [];

    this._update = [];

    this._bindings = [];
};

Builder.prototype.createBuilder = function(){
    return new Builder();
}

Builder.prototype.table = function(table){
    this._table = table;
    return this;
}

Builder.prototype.from = function(table){
    return this.table(table);
}

Builder.prototype.select = function(){
    var args = Array.prototype.slice.call(arguments);
    this._select = args;
    this._method = 'Select';
    return this;
}

Builder.prototype.whereRaw = function(condition, bindings){

    var where = {
        type: 'Raw',
        value: condition,
        connector: 'and'
    };

    this._where.push(where);

    if(bindings !== undefined){
        bindings.forEach(function(binding){
            this._bindings.push(binding);
        }.bind(this));
    }

    return this;
}

Builder.prototype.where = function(){

    //build the where object, allow for where(column, value) and where(column, operator, value)
    var where = {
        type: 'Basic',
        column: arguments[0],
        operator: arguments.length == 3 ? arguments[1] : '=',
        value: arguments.length == 3 ? arguments[2] : arguments[1],
        connector: 'and'
    };

    this._bindings.push(where.value);

    this._where.push(where);

    return this;
}

Builder.prototype.andWhere = function(callback){
    var newBuilder = this.createBuilder();
    callback(newBuilder);
    var where = {
        type: 'And',
        builder: newBuilder,
        connector: 'and'
    };
    this._where.push(where);

    newBuilder.getBindings().forEach(function(binding){
        this._bindings.push(binding);
    }.bind(this));

    return this;
}

Builder.prototype.orWhere = function(callback){
    var newBuilder = this.createBuilder();
    callback(newBuilder);
    var where = {
        type: 'Or',
        builder: newBuilder,
        connector: 'or'
    };
    this._where.push(where);

    newBuilder.getBindings().forEach(function(binding){
        this._bindings.push(binding);
    }.bind(this));

    return this;
}

Builder.prototype.whereBetween = function(column, value){

    var where = {
        type: 'Between',
        column: column,
        value: value,
        connector: 'and'
    };

    this._bindings.push(value[0]);
    this._bindings.push(value[1]);

    this._where.push(where);
    return this;
}

Builder.prototype.whereNotBetween = function(column, value){
    var where = {
        type: 'NotBetween',
        column: column,
        value: value,
        connector: 'and'
    };

    this._bindings.push(value[0]);
    this._bindings.push(value[1]);

    this._where.push(where);
    return this;
}

Builder.prototype.whereIn = function(column, value){
    var where = {
        type: 'In',
        column: column,
        value: value,
        connector: 'and'
    };

    this._bindings.push(value.join(', '));

    this._where.push(where);
    return this;
}

Builder.prototype.whereNotIn = function(column, value){
    var where = {
        type: 'NotIn',
        column: column,
        value: value,
        connector: 'and'
    };

    this._bindings.push(value.join(', '));

    this._where.push(where);
    return this;
}

Builder.prototype.whereNull = function(column){
    var where = {
        type: 'Null',
        column: column,
        connector: 'and'
    };

    this._where.push(where);
    return this;
}

Builder.prototype.whereNotNull = function(column){
    var where = {
        type: 'NotNull',
        column: column,
        connector: 'and'
    };

    this._where.push(where);
    return this;
}

Builder.prototype.whereExists = function(callback){
    var newBuilder = this.createBuilder();
    callback(newBuilder);
    var where = {
        type: 'Exists',
        builder: newBuilder,
        connector: 'and'
    };
    this._where.push(where);

    newBuilder.getBindings().forEach(function(binding){
        this._bindings.push(binding);
    }.bind(this));

    return this;
}

Builder.prototype.orderBy = function(column, direction){
    this._orderBy.push([column, direction ? direction : 'desc']);
    return this;
}

Builder.prototype.skip = function(skip){
    this._start = skip;
    return this;
}

Builder.prototype.take = function(take){
    this._end = take;
    return this;
}

Builder.prototype.limit = function(start, end){
    this.skip(start);
    this.take(end);
    return this;
}

Builder.prototype.insert = function(data){
    this._method = 'Insert';
    return this._insert = data;
}

Builder.prototype.update = function(data){
    this._method = 'Update';
    this._update = data;
    return this;
}

Builder.prototype.delete = function(){
    this._method = 'Delete';
    return this;
}

Builder.prototype.compiler = function(dialect){

    dialect = dialect ? dialect : 'mysql';

    var c = require('./dialects/' + dialect + '/compiler'),
        compiler = new c(this, dialect);

    return compiler;
}

Builder.prototype.toSql = function(dialect){
    return this.compiler(dialect).compile();
}

Builder.prototype.compileWhere = function(dialect){
    return this.compiler(dialect).compileWhere();
}

Builder.prototype.getBindings = function(){
    return this._bindings;
}

module.exports = Builder;