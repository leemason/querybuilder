var _ = require('lodash');

module.exports = {

    compileJoins: function () {
        var statements = [];

        statements.push(this._compileJoins());
        statements.push(this._compileLeftJoins());
        statements.push(this._compileLeftOuterJoins());
        statements.push(this._compileRightJoins());
        statements.push(this._compileRightOuterJoins());
        statements.push(this._compileOuterJoins());
        statements.push(this._compileFullOuterJoins());
        statements.push(this._compileCrossJoins());
        statements.push(this._compileRawJoins());

        return _.compact(statements).join(' ');
    },

    _compileJoins: function () {
        var statements = [];

        this._builder._joins.forEach(function(join){
            statements.push('inner join');
            statements.push(this.escapeId(join[0]));
            statements.push('on');
            statements.push(this.escapeId(join[1]));
            statements.push(join[2]);
            statements.push(this.escapeId(join[3]));
        }.bind(this));

        return _.compact(statements).join(' ');
    },

    _compileLeftJoins: function () {
        var statements = [];

        this._builder._leftJoins.forEach(function(join){
            statements.push('left join');
            statements.push(this.escapeId(join[0]));
            statements.push('on');
            statements.push(this.escapeId(join[1]));
            statements.push(join[2]);
            statements.push(this.escapeId(join[3]));
        }.bind(this));

        return _.compact(statements).join(' ');
    },

    _compileLeftOuterJoins: function () {
        var statements = [];

        this._builder._leftOuterJoins.forEach(function(join){
            statements.push('left outer join');
            statements.push(this.escapeId(join[0]));
            statements.push('on');
            statements.push(this.escapeId(join[1]));
            statements.push(join[2]);
            statements.push(this.escapeId(join[3]));
        }.bind(this));

        return _.compact(statements).join(' ');
    },

    _compileRightJoins: function () {
        var statements = [];

        this._builder._rightJoins.forEach(function(join){
            statements.push('right join');
            statements.push(this.escapeId(join[0]));
            statements.push('on');
            statements.push(this.escapeId(join[1]));
            statements.push(join[2]);
            statements.push(this.escapeId(join[3]));
        }.bind(this));

        return _.compact(statements).join(' ');
    },

    _compileRightOuterJoins: function () {
        var statements = [];

        this._builder._rightOuterJoins.forEach(function(join){
            statements.push('right outer join');
            statements.push(this.escapeId(join[0]));
            statements.push('on');
            statements.push(this.escapeId(join[1]));
            statements.push(join[2]);
            statements.push(this.escapeId(join[3]));
        }.bind(this));

        return _.compact(statements).join(' ');
    },

    _compileOuterJoins: function () {
        var statements = [];

        this._builder._outerJoins.forEach(function(join){
            statements.push('outer join');
            statements.push(this.escapeId(join[0]));
            statements.push('on');
            statements.push(this.escapeId(join[1]));
            statements.push(join[2]);
            statements.push(this.escapeId(join[3]));
        }.bind(this));

        return _.compact(statements).join(' ');
    },

    _compileFullOuterJoins: function () {
        var statements = [];

        this._builder._fullOuterJoins.forEach(function(join){
            statements.push('full outer join');
            statements.push(this.escapeId(join[0]));
            statements.push('on');
            statements.push(this.escapeId(join[1]));
            statements.push(join[2]);
            statements.push(this.escapeId(join[3]));
        }.bind(this));

        return _.compact(statements).join(' ');
    },

    _compileCrossJoins: function () {
        var statements = [];

        this._builder._crossJoins.forEach(function(join){
            statements.push('cross join');
            statements.push(this.escapeId(join[0]));
            statements.push('on');
            statements.push(this.escapeId(join[1]));
            statements.push(join[2]);
            statements.push(this.escapeId(join[3]));
        }.bind(this));

        return _.compact(statements).join(' ');
    },

    _compileRawJoins: function () {
        var statements = [];

        this._builder._rawJoins.forEach(function(join){
            statements.push(join);
        }.bind(this));

        return _.compact(statements).join(' ');
    }
}