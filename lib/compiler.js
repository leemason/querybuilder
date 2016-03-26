var _ = require('lodash');

var Compiler = function(builder, dialect){

    this._builder = builder;
    this._dialect = dialect;
};

Compiler.prototype.compile = function(){
    return this['compile' + this._builder._method]();
}

Compiler.prototype.compileSelect = function(close){

    var statements = [];

    statements.push('select');
    statements.push(this._builder._select.join(', '));
    statements.push('from');
    statements.push(this._builder._table);

    //compile the where query
    if(this._builder._where.length > 0){
        statements.push(this.compileWhere(true));
    }

    //should we add orderby?
    if(this._builder._orderBy.length > 0){
        statements.push('order by');
        statements.push(_.map(this._builder._orderBy, function(order){
            return order[0] + ' ' + order[1];
        }).join(', '));
    }

    //if start/end arent 0 we have a limit clause
    if(this._builder._start != 0 || this._builder._end != 0){
        statements.push('limit');
        if(this._builder._start == 0){
            statements.push(this._builder._end);
        }else{
            statements.push([this._builder._start, this._builder._end].join(','));
        }
    }

    return _.compact(statements).join(' ') + (close === false ? '' : ';');
}

Compiler.prototype.compileInsert = function(){

    var statements = [];

    statements.push('insert into');
    statements.push(this._builder._table);

    var first = this._builder._insert[0];
    statements.push('(' + _.keys(first).join(',') + ')');

    //(col1,col2,...)
    statements.push('values');

    statements.push(_.map(this._builder._insert, function(values){
        return '(' + _.values(values).join(',') + ')';
    }).join(','));

    return _.compact(statements).join(' ') + ';';
}

Compiler.prototype.compileWhere = function(root){

    var statements = [];

    statements.push(root === true ? 'where' : '');

    this._builder._where.forEach(function(clause, index, wheres){

        var where = this['compileWhere' + clause.type](clause);

        statements.push(where.sql);

        statements.push(this.addWhereConnector(index, wheres));

    }.bind(this));

    return _.compact(statements).join(' ');
}

Compiler.prototype.addWhereConnector = function(index, wheres){

    var i = index + 1;
    if(wheres[i] == undefined){
        return '';
    }

    return wheres[i].connector;
}

Compiler.prototype.compileWhereBasic = function(clause){
    return {
        sql: clause.column + ' ' + clause.operator + ' ?'
    };
}

Compiler.prototype.compileWhereAnd = function(clause){
    return {
        sql: '(' + clause.builder.compileWhere(this._dialect) + ')'
    };
}

Compiler.prototype.compileWhereOr = function(clause){
    return {
        sql: '(' + clause.builder.compileWhere(this._dialect) + ')'
    };
}

Compiler.prototype.compileWhereBetween = function(clause){
    return {
        sql: clause.column + ' between ? and ?'
    };
}

Compiler.prototype.compileWhereNotBetween = function(clause){
    return {
        sql: clause.column + ' not between ? and ?'
    };
}

Compiler.prototype.compileWhereIn = function(clause){
    return {
        sql: clause.column + ' in ( ? )'
    };
}

Compiler.prototype.compileWhereNotIn = function(clause){
    return {
        sql: clause.column + ' not in ( ? )'
    };
}

Compiler.prototype.compileWhereNull = function(clause){
    return {
        sql: clause.column + ' is null'
    };
}

Compiler.prototype.compileWhereNotNull = function(clause){
    return {
        sql: clause.column + ' is not null'
    };
}

Compiler.prototype.compileWhereExists = function(clause){
    return {
        sql: 'exists (' + clause.builder.toSql(this._dialect).slice(0, -1) + ')'
    };
}

Compiler.prototype.compileWhereRaw = function(clause){
    return {
        sql: clause.value
    };
}

module.exports = Compiler;