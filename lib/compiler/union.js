var _ = require('lodash');

module.exports = {

    compileUnion: function(){
        var statements = [];

        var tmpOrderBy = this._builder._orderBy;

        //clear the order by for select
        this._builder._orderBy = [];

        //get base select
        var sql = this.compileSelect().slice(0, -1);

        var unions = [];
        //push base select
        unions.push(sql);

        //loop unions and add
        this._builder._union.forEach(function(builder){
            unions.push(builder.toSql(this._dialect).slice(0, -1));
        });

        //flatten unions into statement
        statements.push('(' + unions.join(') union (') + ')');

        //restore order by
        this._builder._orderBy = tmpOrderBy;
        statements.push(this.compileOrderBy());

        return _.compact(statements).join(' ') + ';';
    },

    compileUnionAll: function(){
        var statements = [];

        var tmpOrderBy = this._builder._orderBy;

        //clear the order by for select
        this._builder._orderBy = [];

        //get base select
        var sql = this.compileSelect().slice(0, -1);

        var unions = [];
        //push base select
        unions.push(sql);

        //loop unions and add
        this._builder._unionAll.forEach(function(builder){
            unions.push(builder.toSql(this._dialect).slice(0, -1));
        });

        //flatten unions into statement
        statements.push('(' + unions.join(') union all (') + ')');

        //restore order by
        this._builder._orderBy = tmpOrderBy;
        statements.push(this.compileOrderBy());

        return _.compact(statements).join(' ') + ';';
    }
}