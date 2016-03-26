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
        it("should have a default _select value of ['*']", function(){
            expect(builder).to.have.a.property("_select");
            expect(builder._select).to.be.a("array");
            expect(builder._select.length).to.equal(1);
            expect(builder._select).to.eql(['*']);
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

        });
    });


    describe("#toSql()", function() {
        it("should return a raw query string", function () {

            var result = builder
                .table('users')
                .where('first_name', '=', 'name')
                .toSql('mysql');

            expect(result).to.equal("select * from users where first_name = ?;");

        });
    });

});