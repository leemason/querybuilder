var _ = require('lodash');

module.exports = {

    compileSelect: function(){

        var statements = [];

        statements.push('select');
        statements.push(this._builder._distinct === true ? 'distinct' : '');

        statements.push(this.compileSelectFields());

        statements.push('from');
        statements.push(this.table());

        statements.push(this.compileJoins());

        statements.push(this.compileWhere(true));

        statements.push(this.compileOrderBy());

        statements.push(this.compileGroupBy());

        statements.push(this.compileHaving(true));

        statements.push(this.compileLimit());

        return _.compact(statements).join(' ') + ';';
    },

    compileSelectFields: function(){

        var statements = [];

        _.map(this._builder._select, function(column){
            if(column == '*'){
                statements.push('*');
                return column;

            }
            statements.push(this.escapeId(column));
            return this.escapeId(column);
        }.bind(this));

        statements.push(this.compileCount());

        statements.push(this.compileCountDistinct());

        statements.push(this.compileMin());

        statements.push(this.compileMax());

        statements.push(this.compileSum());

        statements.push(this.compileSumDistinct());

        statements.push(this.compileAvg());

        statements.push(this.compileAvgDistinct());

        if(_.compact(statements).length == 0){
            statements.push('*');
        }

        return _.compact(statements).join(', ');
    },

    compileCount: function(){
        if(this._builder._count.length > 0){

            var count = this._builder._count[0];
            //wrap count
            if(count != '*'){
                count = '`' + count + '`';
            }

            if(this._builder._count.length > 1){
                count += ') as ' + this._builder._count[1];
            }else{
                count += ')';
            }

            return 'count(' + count;
        }
    },

    compileCountDistinct: function(){
        if(this._builder._countDistinct.length > 0){

            var count = this._builder._countDistinct[0];
            //wrap count
            if(count != '*'){
                count = '`' + count + '`';
            }

            if(this._builder._countDistinct.length > 1){
                count += ') as ' + this._builder._countDistinct[1];
            }else{
                count += ')';
            }

            return 'count(distinct ' + count;
        }
    },


    compileSum: function(){
        if(this._builder._sum.length > 0){

            var sum = this._builder._sum[0];
            //wrap sum
            if(sum != '*'){
                sum = '`' + sum + '`';
            }

            if(this._builder._sum.length > 1){
                sum += ') as ' + this._builder._sum[1];
            }else{
                sum += ')';
            }

            return 'sum(' + sum;
        }
    },

    compileSumDistinct: function(){
        if(this._builder._sumDistinct.length > 0){

            var sum = this._builder._sumDistinct[0];
            //wrap sum
            if(sum != '*'){
                sum = '`' + sum + '`';
            }

            if(this._builder._sumDistinct.length > 1){
                sum += ') as ' + this._builder._sumDistinct[1];
            }else{
                sum += ')';
            }

            return 'sum(distinct ' + sum;
        }
    },


    compileAvg: function(){
        if(this._builder._avg.length > 0){

            var avg = this._builder._avg[0];
            //wrap avg
            if(avg != '*'){
                avg = '`' + avg + '`';
            }

            if(this._builder._avg.length > 1){
                avg += ') as ' + this._builder._avg[1];
            }else{
                avg += ')';
            }

            return 'avg(' + avg;
        }
    },

    compileAvgDistinct: function(){
        if(this._builder._avgDistinct.length > 0){

            var avg = this._builder._avgDistinct[0];
            //wrap avg
            if(avg != '*'){
                avg = '`' + avg + '`';
            }

            if(this._builder._avgDistinct.length > 1){
                avg += ') as ' + this._builder._avgDistinct[1];
            }else{
                avg += ')';
            }

            return 'avg(distinct ' + avg;
        }
    },

    compileMin: function(){
        if(this._builder._min.length > 0){

            var count = this._builder._min[0];
            //wrap count
            if(count != '*'){
                count = '`' + count + '`';
            }

            if(this._builder._min.length > 1){
                count += ') as ' + this._builder._min[1];
            }else{
                count += ')';
            }

            return 'min(' + count;
        }
    },

    compileMax: function(){
        if(this._builder._max.length > 0){

            var count = this._builder._max[0];
            //wrap count
            if(count != '*'){
                count = '`' + count + '`';
            }

            if(this._builder._max.length > 1){
                count += ') as ' + this._builder._max[1];
            }else{
                count += ')';
            }

            return 'max(' + count;
        }
    }
}