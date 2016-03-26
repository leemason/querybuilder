var expect = require("chai").expect,
    Builder = require("../lib/builder"),
    builder;

describe("Builder", function(){

    beforeEach(function() {
        builder = new Builder();
    });

    describe("#root", function(){
        it("should have a default _method value of 'Select'", function(){
            expect(builder).to.have.a.property("_method", "Select");
        });
        it("should have a default _start value of 0", function(){
            expect(builder).to.have.a.property("_start", 0);
        });
        it("should have a default _end value of 0", function(){
            expect(builder).to.have.a.property("_end", 0);
        });
        it("should have a default _select value of []", function(){
            expect(builder).to.have.a.property("_select");
            expect(builder._select).to.be.a("array");
            expect(builder._select.length).to.equal(0);
            expect(builder._select).to.eql([]);
        });
    });

    describe("#table()", function(){
        it("should set the _table property", function(){

            builder.table('users');

            expect(builder).to.have.a.property("_table", "users");
        });
    });

    describe("#from()", function(){
        it("should set the _table property", function(){

            builder.from('users');

            expect(builder).to.have.a.property("_table", "users");
        });
    });

    describe("#truncate()", function(){
        it("should set the _method property", function(){

            builder.table('users').truncate();

            expect(builder).to.have.a.property("_method", "Truncate");
        });
    });

    describe("#select()", function(){

        it("should set the _method property", function(){

            //do this as select is auto
            builder._method = 'Insert';
            expect(builder).to.have.a.property("_method", "Insert");

            builder.select();

            expect(builder).to.have.a.property("_method", "Select");
        });

        it("should accept multiple arguments", function(){

            builder.select(1, 2, 3);

            expect(builder._select.length).to.equal(3);

            expect(builder._select[0]).to.equal(1);

            expect(builder._select[1]).to.equal(2);

            expect(builder._select[2]).to.equal(3);

        });
    });

    describe("#distinct()", function(){

        it("should set the _method property", function(){

            //do this as select is auto
            builder._method = 'Insert';
            expect(builder).to.have.a.property("_method", "Insert");

            builder.distinct();

            expect(builder).to.have.a.property("_method", "Select");
        });

        it("should set the _distinct property", function(){

            expect(builder).to.have.a.property("_distinct", false);

            builder.distinct();

            expect(builder).to.have.a.property("_distinct", true);
        });
    });

    describe("#count()", function(){

        it("should set the _count property with default value", function(){

            expect(builder).to.have.a.property("_count");

            builder.count();

            expect(builder._count).to.eql(['*']);
        });

        it("should set the _count property as provided", function(){

            builder.count('column');

            expect(builder._count).to.eql(['column']);
        });

        it("should set the _count property with 'as' clause", function(){

            builder.count('column', 'count');

            expect(builder._count).to.eql(['column', 'count']);
        });
    });


    describe("#countDistinct()", function(){

        it("should set the _countDistinct property with default value", function(){

            expect(builder).to.have.a.property("_countDistinct");

            builder.countDistinct();

            expect(builder._countDistinct).to.eql(['*']);
        });

        it("should set the _countDistinct property as provided", function(){

            builder.countDistinct('column');

            expect(builder._countDistinct).to.eql(['column']);
        });

        it("should set the _countDistinct property with 'as' clause", function(){

            builder.countDistinct('column', 'count');

            expect(builder._countDistinct).to.eql(['column', 'count']);
        });
    });

    describe("#min()", function(){

        it("should set the _min property with default value", function(){

            expect(builder).to.have.a.property("_min");

            builder.min('column');

            expect(builder._min).to.eql(['column']);
        });

        it("should set the _min property as provided", function(){

            builder.min('column');

            expect(builder._min).to.eql(['column']);
        });

        it("should set the _min property with 'as' clause", function(){

            builder.min('column', 'min');

            expect(builder._min).to.eql(['column', 'min']);
        });
    });

    describe("#max()", function(){

        it("should set the _max property with default value", function(){

            expect(builder).to.have.a.property("_max");

            builder.max('column');

            expect(builder._max).to.eql(['column']);
        });

        it("should set the _max property as provided", function(){

            builder.max('column');

            expect(builder._max).to.eql(['column']);
        });

        it("should set the _max property with 'as' clause", function(){

            builder.max('column', 'max');

            expect(builder._max).to.eql(['column', 'max']);
        });
    });


    describe("#sum()", function(){

        it("should set the _sum property with default value", function(){

            expect(builder).to.have.a.property("_sum");

            builder.sum();

            expect(builder._sum).to.eql(['*']);
        });

        it("should set the _sum property as provided", function(){

            builder.sum('column');

            expect(builder._sum).to.eql(['column']);
        });

        it("should set the _sum property with 'as' clause", function(){

            builder.sum('column', 'sum');

            expect(builder._sum).to.eql(['column', 'sum']);
        });
    });


    describe("#sumDistinct()", function(){

        it("should set the _sumDistinct property with default value", function(){

            expect(builder).to.have.a.property("_sumDistinct");

            builder.sumDistinct();

            expect(builder._sumDistinct).to.eql(['*']);
        });

        it("should set the _sumDistinct property as provided", function(){

            builder.sumDistinct('column');

            expect(builder._sumDistinct).to.eql(['column']);
        });

        it("should set the _sumDistinct property with 'as' clause", function(){

            builder.sumDistinct('column', 'sum');

            expect(builder._sumDistinct).to.eql(['column', 'sum']);
        });
    });


    describe("#avg()", function(){

        it("should set the _avg property with default value", function(){

            expect(builder).to.have.a.property("_avg");

            builder.avg();

            expect(builder._avg).to.eql(['*']);
        });

        it("should set the _avg property as provided", function(){

            builder.avg('column');

            expect(builder._avg).to.eql(['column']);
        });

        it("should set the _avg property with 'as' clause", function(){

            builder.avg('column', 'avg');

            expect(builder._avg).to.eql(['column', 'avg']);
        });
    });


    describe("#avgDistinct()", function(){

        it("should set the _avgDistinct property with default value", function(){

            expect(builder).to.have.a.property("_avgDistinct");

            builder.avgDistinct();

            expect(builder._avgDistinct).to.eql(['*']);
        });

        it("should set the _avgDistinct property as provided", function(){

            builder.avgDistinct('column');

            expect(builder._avgDistinct).to.eql(['column']);
        });

        it("should set the _avgDistinct property with 'as' clause", function(){

            builder.avgDistinct('column', 'avg');

            expect(builder._avgDistinct).to.eql(['column', 'avg']);
        });
    });

    describe("#union()", function(){

        it("should set the _method property", function(){

            builder.union(new Builder());

            expect(builder).to.have.a.property("_method", "Union");
        });

        it("should append the _union property", function(){

            expect(builder._union.length).to.equal(0);

            builder.union(new Builder());

            expect(builder._union.length).to.equal(1);

        });

        it("should accept a new builder", function(){

            builder.union(new Builder());

            expect(builder._union[0]).to.be.instanceof(Builder);

        });

        it("should accept a closure and pass a new builder", function(){

            builder.union(function(b){

            });

            expect(builder._union[0]).to.be.instanceof(Builder);

        });
    });

    describe("#unionAll()", function(){

        it("should set the _method property", function(){

            builder.unionAll(new Builder());

            expect(builder).to.have.a.property("_method", "UnionAll");
        });

        it("should append the _unionAll property", function(){

            expect(builder._unionAll.length).to.equal(0);

            builder.unionAll(new Builder());

            expect(builder._unionAll.length).to.equal(1);

        });

        it("should accept a new builder", function(){

            builder.unionAll(new Builder());

            expect(builder._unionAll[0]).to.be.instanceof(Builder);

        });

        it("should accept a closure and pass a new builder", function(){

            builder.unionAll(function(b){

            });

            expect(builder._unionAll[0]).to.be.instanceof(Builder);

        });
    });

    describe("#whereRaw()", function() {
        it("should add to the _where property", function () {

            expect(builder._where).to.be.a("array");

            expect(builder._where.length).to.equal(0);

            builder.whereRaw('user = username');

            expect(builder._where.length).to.equal(1);

            expect(builder._where[0]).to.be.a("object");

            expect(builder._where[0]).to.eql({
                type: 'Raw',
                value: 'user = username',
                connector: 'and'
            });

        });

        it("should allow addition of bindings", function () {

            expect(builder._bindings).to.be.a("array");

            expect(builder._bindings.length).to.equal(0);

            builder.whereRaw('user = ?', ['username']);

            expect(builder._bindings.length).to.equal(1);

            expect(builder._bindings[0]).to.be.a("string");

            expect(builder._bindings[0]).to.equal('username');

        });
    });

    describe("#where()", function(){
        it("should add to the _where property", function(){

            expect(builder._where).to.be.a("array");

            expect(builder._where.length).to.equal(0);

            builder.where('user', '=', 'username');

            expect(builder._where.length).to.equal(1);

            expect(builder._where[0]).to.be.a("object");

            expect(builder._where[0]).to.eql({
                type: 'Basic',
                column: 'user',
                operator: '=',
                value: 'username',
                connector: 'and'
            });

        });

        it("should allow two arguments", function(){

            builder.where('user', 'username');

            expect(builder._where[0]).to.eql({
                type: 'Basic',
                column: 'user',
                operator: '=',
                value: 'username',
                connector: 'and'
            });

        });

        it("should allow three arguments", function(){

            builder.where('user', '!=', 'username');

            expect(builder._where[0]).to.eql({
                type: 'Basic',
                column: 'user',
                operator: '!=',
                value: 'username',
                connector: 'and'
            });

        });

        it("should add any bindings to the builder", function(){

            builder.where('user', '!=', 'username');

            expect(builder._bindings[0]).to.equal('username');

        });
    });


    describe("#andWhere()", function(){
        it("should add to the _where property", function(){

            expect(builder._where).to.be.a("array");

            expect(builder._where.length).to.equal(0);

            builder.andWhere(function(q){
                q.where('user', '=', 'username');
            });

            expect(builder._where.length).to.equal(1);

            expect(builder._where[0]).to.be.a("object");

            expect(builder._where[0].type).to.eql('And');
            expect(builder._where[0].connector).to.eql('and');

        });

        it("should add any nested bindings to the root builder", function(){

            builder.andWhere(function(q){
                q.where('user', '=', 'username');
            });

            expect(builder._bindings[0]).to.equal('username');

        });
    });


    describe("#orWhere()", function(){
        it("should add to the _where property", function(){

            expect(builder._where).to.be.a("array");

            expect(builder._where.length).to.equal(0);

            builder.orWhere(function(q){
                q.where('user', '=', 'username');
            });

            expect(builder._where.length).to.equal(1);

            expect(builder._where[0]).to.be.a("object");

            expect(builder._where[0].type).to.eql('Or');
            expect(builder._where[0].connector).to.eql('or');

        });

        it("should add any nested bindings to the root builder", function(){

            builder.orWhere(function(q){
                q.where('user', '=', 'username');
            });

            expect(builder._bindings[0]).to.equal('username');

        });
    });

    describe("#whereBetween()", function(){
        it("should add to the _where property", function(){

            builder.whereBetween('user', [10, 100]);

            expect(builder._where.length).to.equal(1);

            expect(builder._where[0]).to.be.a("object");

            expect(builder._where[0]).to.eql({
                type: 'Between',
                column: 'user',
                value: [10, 100],
                connector: 'and'
            });

        });

        it("should add any bindings to the builder", function(){

            builder.whereBetween('user', [10, 100]);

            expect(builder._bindings.length).to.equal(2);
            expect(builder._bindings[0]).to.equal(10);
            expect(builder._bindings[1]).to.equal(100);

        });
    });

    describe("#whereNotBetween()", function(){
        it("should add to the _where property", function(){

            builder.whereNotBetween('user', [10, 100]);

            expect(builder._where.length).to.equal(1);

            expect(builder._where[0]).to.be.a("object");

            expect(builder._where[0]).to.eql({
                type: 'NotBetween',
                column: 'user',
                value: [10, 100],
                connector: 'and'
            });

        });

        it("should add any bindings to the builder", function(){

            builder.whereNotBetween('user', [10, 100]);

            expect(builder._bindings.length).to.equal(2);
            expect(builder._bindings[0]).to.equal(10);
            expect(builder._bindings[1]).to.equal(100);

        });
    });

    describe("#whereIn()", function(){
        it("should add to the _where property", function(){

            builder.whereIn('user', [10, 100]);

            expect(builder._where.length).to.equal(1);

            expect(builder._where[0]).to.be.a("object");

            expect(builder._where[0]).to.eql({
                type: 'In',
                column: 'user',
                value: [10, 100],
                connector: 'and'
            });

        });

        it("should add any bindings to the builder", function(){

            builder.whereIn('user', [10, 100]);

            expect(builder._bindings.length).to.equal(1);
            expect(builder._bindings[0]).to.equal('10, 100');

        });
    });

    describe("#whereNotIn()", function(){
        it("should add to the _where property", function(){

            builder.whereNotIn('user', [10, 100]);

            expect(builder._where.length).to.equal(1);

            expect(builder._where[0]).to.be.a("object");

            expect(builder._where[0]).to.eql({
                type: 'NotIn',
                column: 'user',
                value: [10, 100],
                connector: 'and'
            });

        });

        it("should add any bindings to the builder", function(){

            builder.whereNotIn('user', [10, 100]);

            expect(builder._bindings.length).to.equal(1);
            expect(builder._bindings[0]).to.equal('10, 100');

        });
    });


    describe("#whereNull()", function(){
        it("should add to the _where property", function(){

            builder.whereNull('user');

            expect(builder._where.length).to.equal(1);

            expect(builder._where[0]).to.be.a("object");

            expect(builder._where[0]).to.eql({
                type: 'Null',
                column: 'user',
                connector: 'and'
            });

        });
    });

    describe("#whereNotNull()", function(){
        it("should add to the _where property", function(){

            builder.whereNotNull('user');

            expect(builder._where.length).to.equal(1);

            expect(builder._where[0]).to.be.a("object");

            expect(builder._where[0]).to.eql({
                type: 'NotNull',
                column: 'user',
                connector: 'and'
            });

        });
    });


    describe("#whereExists()", function(){
        it("should add to the _where property", function(){

            builder.whereExists(function(q){
                q.select(1).
                    from('orders').
                    whereRaw('orders.user_id = user.id');
            });

            expect(builder._where.length).to.equal(1);

            expect(builder._where[0]).to.be.a("object");

            expect(builder._where[0].type).to.eql('Exists');
            expect(builder._where[0].connector).to.eql('and');

        });

        it("should add any nested bindings to the root builder", function(){

            builder.whereExists(function(q){
                q.select(1).
                    from('orders').
                    where('orders.user_id', 'username');
            });

            expect(builder._bindings[0]).to.equal('username');

        });
    });


    describe("#orderBy()", function(){
        it("should add to the _orderBy property", function(){

            expect(builder._orderBy).to.be.a("array");
            expect(builder._orderBy.length).to.equal(0);

            builder.orderBy('column');

            expect(builder._orderBy.length).to.equal(1);

            expect(builder._orderBy[0]).to.be.a("array");

            expect(builder._orderBy[0]).to.eql(['column', 'desc']);

        });
        it("should set the direction to desc by default", function(){

            builder.orderBy('column');

            expect(builder._orderBy[0]).to.eql(['column', 'desc']);

        });
        it("should set the direction to second argument if supplied", function(){

            builder.orderBy('column', 'asc');

            expect(builder._orderBy[0]).to.eql(['column', 'asc']);

        });
    });

    describe("#orderByRaw()", function(){
        it("should add to the _orderByRaw property", function(){

            expect(builder._orderByRaw).to.be.a("string");
            expect(builder._orderByRaw).to.equal('');

            builder.orderByRaw('column');

            expect(builder._orderByRaw).to.equal('column');

        });
    });

    describe("#groupBy()", function(){
        it("should add to the _groupBy property", function(){

            expect(builder._groupBy).to.be.a("array");
            expect(builder._groupBy.length).to.equal(0);

            builder.groupBy('column');

            expect(builder._groupBy.length).to.equal(1);

            expect(builder._groupBy[0]).to.be.a("string");

            expect(builder._groupBy[0]).to.eql('column');

        });

        it("should allow multiple parameters", function(){

            builder.groupBy('column', 'column2');

            expect(builder._groupBy.length).to.equal(2);

            expect(builder._groupBy).to.eql(['column', 'column2']);

        });
    });


    describe("#groupByRaw()", function(){
        it("should add to the _groupByRaw property", function(){

            expect(builder._groupByRaw).to.be.a("string");
            expect(builder._groupByRaw).to.equal('');

            builder.groupByRaw('column');

            expect(builder._groupByRaw).to.equal('column');

        });
    });

    describe("#skip()", function(){
        it("should update the _start property", function(){

            expect(builder._start).to.be.a("number");
            expect(builder._start).to.equal(0);

            builder.skip(10);

            expect(builder._start).to.equal(10);

        });
    });

    describe("#take()", function(){
        it("should update the _end property", function(){

            expect(builder._end).to.be.a("number");
            expect(builder._end).to.equal(0);

            builder.take(10);

            expect(builder._end).to.equal(10);

        });
    });

    describe("#limit()", function(){
        it("should update the _start and _end property", function(){

            builder.limit(10, 100);

            expect(builder._start).to.equal(10);
            expect(builder._end).to.equal(100);

        });
    });

    describe("#insert()", function(){
        it("should update the _method property", function(){

            builder.insert([]);

            expect(builder._method).to.equal('Insert');

        });

        it("should update the _insert property", function(){

            builder.insert(['some', 'data']);

            expect(builder._insert).to.eql(['some', 'data']);

        });
    });

    describe("#update()", function(){
        it("should update the _method property", function(){

            builder.update([]);

            expect(builder._method).to.equal('Update');

        });

        it("should update the _update property", function(){

            builder.update(['some', 'data']);

            expect(builder._update).to.eql(['some', 'data']);

        });
    });

    describe("#delete()", function(){
        it("should update the _method property", function(){

            builder.delete();

            expect(builder._method).to.equal('Delete');

        });
    });

    describe("#getBindings()", function(){
        it("should return an ordered array of to-be-bound parameters", function(){

            builder.table('table')
                .where('first_name', 'first')
                .where('last_name', 'last')
                .whereIn('role', ['admin', 'editor', 'moderator'])
                .whereRaw('custom_field > ?', [100]);

            expect(builder._bindings.length).to.equal(4);
            expect(builder._bindings).to.eql(['first', 'last', 'admin, editor, moderator', 100]);

            expect(builder.getBindings()).to.eql(['first', 'last', 'admin, editor, moderator', 100]);

            //simulate an update to ensure getBindings merges params
            builder.insert({
                first_name: 'testing'
            });

            expect(builder.getBindings()).to.eql(['first', 'last', 'admin, editor, moderator', 100, 'testing']);


            //simulate an mass update to ensure getBindings merges params
            builder.insert([
                {
                    first_name: 'testing'
                },
                {
                    first_name: 'testing'
                },
                {
                    first_name: 'testing'
                }
            ]);

            expect(builder.getBindings()).to.eql(['first', 'last', 'admin, editor, moderator', 100, 'testing', 'testing', 'testing']);

            //reset insert
            builder.insert([]);

            //simulate an update to ensure getBindings merges params
            builder.update({
                first_name: 'testing'
            });

            expect(builder.getBindings()).to.eql(['first', 'last', 'admin, editor, moderator', 100, 'testing']);

        });

        it("should return an ordered array of to-be-bound parameters when running unions", function(){

            builder.table('table')
                .where('first_name', 'first')
                .where('last_name', 'last')
                .whereIn('role', ['admin', 'editor', 'moderator'])
                .whereRaw('custom_field > ?', [100])
                .union(function(b){
                    b.table('newtable')
                        .select('column1', 'column2')
                        .where('active', true);
                });

            expect(builder._bindings.length).to.equal(5);
            expect(builder._bindings).to.eql(['first', 'last', 'admin, editor, moderator', 100, true]);

            expect(builder.getBindings()).to.eql(['first', 'last', 'admin, editor, moderator', 100, true]);

        });

        it("should return an ordered array of to-be-bound parameters when running unionAll", function(){

            builder.table('table')
                .where('first_name', 'first')
                .where('last_name', 'last')
                .whereIn('role', ['admin', 'editor', 'moderator'])
                .whereRaw('custom_field > ?', [100])
                .unionAll(function(b){
                    b.table('newtable')
                        .select('column1', 'column2')
                        .where('active', true)
                        .where('foo', 'bar');
                });

            expect(builder._bindings.length).to.equal(6);
            expect(builder._bindings).to.eql(['first', 'last', 'admin, editor, moderator', 100, true, 'bar']);

            expect(builder.getBindings()).to.eql(['first', 'last', 'admin, editor, moderator', 100, true, 'bar']);

        });
    });


    describe("#toSql()", function() {
        it("should return a raw query string", function () {

            var result = builder
                .table('users')
                .where('first_name', '=', 'name')
                .toSql('mysql');

            expect(result).to.equal("select * from `users` where `first_name` = ?;");

        });
    });

});