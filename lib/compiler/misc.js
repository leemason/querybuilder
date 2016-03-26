var _ = require('lodash'),
    Escaper = require('./../escaper'),
    e = new Escaper();

module.exports = {

    escapeId: function(str){
        return e.escapeId(str);
    },

    table: function(){
        return this.escapeId(this._builder._table);
    },

    compile: function(){
        return this['compile' + this._builder._method]();
    },

    compileLimit: function(){
        var statements = [];
        //if start/end arent 0 we have a limit clause
        if(this._builder._start != 0 || this._builder._end != 0){
            statements.push('limit');
            if(this._builder._start == 0){
                statements.push(this._builder._end);
            }else{
                statements.push([this._builder._start, this._builder._end].join(','));
            }
        }
        return _.compact(statements).join(' ');
    },

    compileOrderBy: function(){
        var statements = [];
        //should we add orderby?
        if(this._builder._orderByRaw != ''){
            statements.push('order by');
            statements.push(this._builder._orderByRaw);
        }else {
            if (this._builder._orderBy.length > 0) {
                statements.push('order by');
                statements.push(_.map(this._builder._orderBy, function (order) {
                    return this.escapeId(order[0]) + ' ' + order[1];
                }.bind(this)).join(', '));
            }
        }
        return _.compact(statements).join(' ');
    },

    compileGroupBy: function(){
        var statements = [];
        //should we add groupby?
        if(this._builder._groupByRaw != ''){
            statements.push('group by');
            statements.push(this._builder._groupByRaw);
        }else{
            if(this._builder._groupBy.length > 0){
                statements.push('group by');
                statements.push(_.map(this._builder._groupBy, function(column){return this.escapeId(column)}.bind(this)).join(', '));
            }
        }
        return _.compact(statements).join(' ');
    }

}