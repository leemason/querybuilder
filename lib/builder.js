var _ = require('lodash');

var Builder = function(){

    this._method = 'Select';

    this._table = '';

    this._select = [];

    this._distinct = false;

    this._count = [];

    this._countDistinct = [];

    this._sum = [];

    this._sumDistinct = [];

    this._avg = [];

    this._avgDistinct = [];

    this._min = [];

    this._max = [];

    this._union = [];

    this._joins = [];

    this._leftJoins = [];

    this._leftOuterJoins = [];

    this._rightJoins = [];

    this._rightOuterJoins = [];

    this._outerJoins = [];

    this._fullOuterJoins = [];

    this._crossJoins = [];

    this._rawJoins = [];

    this._unionAll = [];

    this._where = [];

    this._having = [];

    this._orderBy = [];

    this._orderByRaw = '';

    this._groupBy = [];

    this._groupByRaw = '';

    this._start = 0;

    this._end = 0;

    this._insert = [];

    this._update = [];

    this._bindings = [];
};

_.assign(Builder.prototype, require('./builder/where'));

_.assign(Builder.prototype, require('./builder/having'));

_.assign(Builder.prototype, require('./builder/union'));

_.assign(Builder.prototype, require('./builder/join'));

_.assign(Builder.prototype, require('./builder/insert'));

_.assign(Builder.prototype, require('./builder/update'));

_.assign(Builder.prototype, require('./builder/count'));

_.assign(Builder.prototype, require('./builder/sum'));

_.assign(Builder.prototype, require('./builder/avg'));

_.assign(Builder.prototype, require('./builder/min'));

_.assign(Builder.prototype, require('./builder/max'));

_.assign(Builder.prototype, require('./builder/misc'));

Builder.prototype.createBuilder = function(){
    return new Builder();
}

Builder.prototype.compiler = function(dialect){

    dialect = dialect ? dialect : 'mysql';

    var c = require('./dialects/' + dialect + '/compiler'),
        compiler = new c(this, dialect);

    return compiler;
}

Builder.prototype.truncate = function(){
    this._method = 'Truncate';
    return this;
}

Builder.prototype.toSql = function(dialect){
    return this.compiler(dialect).compile();
}

Builder.prototype.getBindings = function(){
    return this._bindings.concat(this.getInsertBindings().concat(this.getUpdateBindings().concat(this.getHavingBindings())));
}

Builder.prototype.toString = function(dialect){
    var Binder = require('./binder'),
        binder = new Binder();

    return binder.prepare(this.toSql(dialect), this.getBindings());
}

module.exports = Builder;