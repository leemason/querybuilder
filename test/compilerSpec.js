var expect = require("chai").expect,
    Builder = require("../lib/builder"),
    builder;

describe("Compiler", function() {

    beforeEach(function () {
        builder = new Builder();
    });

    describe("#compilation", function () {
        it("should compile a simple select query", function () {

            builder.table('users');

            expect(builder.toSql()).to.equal("select * from users;");
        });

        it("should compile a select query with specific columns", function () {

            builder.table('users')
                .select('1', '2', '3');

            expect(builder.toSql()).to.equal("select 1, 2, 3 from users;");
        });

        it("should compile a select query with a raw where", function () {

            builder.table('users')
                .whereRaw('first_name = ?');

            expect(builder.toSql()).to.equal("select * from users where first_name = ?;");
        });

        it("should compile a select query with a simple where", function () {

            builder.table('users')
                .where('first_name', 'name');

            expect(builder.toSql()).to.equal("select * from users where first_name = ?;");
        });

        it("should compile a select query with a simple operator where", function () {

            builder.table('users')
                .where('first_name', '!=',  'name');

            expect(builder.toSql()).to.equal("select * from users where first_name != ?;");
        });

        it("should compile a select query with a and where", function () {

            builder.table('users')
                .where('first_name', 'name')
                .andWhere(function(q){
                    q.where('last_name', 'last')
                    .where('active', true);
                });

            expect(builder.toSql()).to.equal("select * from users where first_name = ? and (last_name = ? and active = ?);");
        });

        it("should compile a select query with a or where", function () {

            builder.table('users')
                .where('first_name', 'name')
                .orWhere(function(q){
                    q.where('last_name', 'last')
                        .where('active', true);
                });

            expect(builder.toSql()).to.equal("select * from users where first_name = ? or (last_name = ? and active = ?);");
        });

        it("should compile a select query with a where between", function () {

            builder.table('users')
                .whereBetween('first_name', [1, 100]);

            expect(builder.toSql()).to.equal("select * from users where first_name between ? and ?;");
        });

        it("should compile a select query with a where not between", function () {

            builder.table('users')
                .whereNotBetween('first_name', [1, 100]);

            expect(builder.toSql()).to.equal("select * from users where first_name not between ? and ?;");
        });

        it("should compile a select query with a where in", function () {

            builder.table('users')
                .whereIn('first_name', [1, 100]);

            expect(builder.toSql()).to.equal("select * from users where first_name in ( ? );");
        });

        it("should compile a select query with a where not in", function () {

            builder.table('users')
                .whereNotIn('first_name', [1, 100]);

            expect(builder.toSql()).to.equal("select * from users where first_name not in ( ? );");
        });

        it("should compile a select query with a where null", function () {

            builder.table('users')
                .whereNull('first_name');

            expect(builder.toSql()).to.equal("select * from users where first_name is null;");
        });

        it("should compile a select query with a where not null", function () {

            builder.table('users')
                .whereNotNull('first_name');

            expect(builder.toSql()).to.equal("select * from users where first_name is not null;");
        });

        it("should compile a select query with a where exists", function () {

            builder.table('users')
                .where('first_name', 'name')
                .whereExists(function(q){
                    q.select(1)
                        .from('orders')
                        .whereRaw('orders.user_id = users.id')
                });

            expect(builder.toSql()).to.equal("select * from users where first_name = ? and exists (select 1 from orders where orders.user_id = users.id);");
        });

        it("should compile a select query with order", function () {

            builder.table('users')
                .where('first_name', 'name')
                .orderBy('email', 'asc');

            expect(builder.toSql()).to.equal("select * from users where first_name = ? order by email asc;");
        });

        it("should compile a select query with limits", function () {

            builder.table('users')
                .where('first_name', 'name')
                .skip(5)
                .take(10);

            expect(builder.toSql()).to.equal("select * from users where first_name = ? limit 5,10;");
        });



        it("should compile a insert query with data", function () {

            builder.table('users')
                .insert([
                    {
                        first_name: 'name',
                        last_name: 'test'
                    }
                ]);

            expect(builder.toSql()).to.equal("insert into users (first_name,last_name) values (name,test);");
        });

        it("should compile a insert query with mass data", function () {

            builder.table('users')
                .insert([
                    {
                        first_name: 'name',
                        last_name: 'test'
                    },
                    {
                        first_name: 'name2',
                        last_name: 'test2'
                    },
                    {
                        first_name: 'name3',
                        last_name: 'test3'
                    }
                ]);

            expect(builder.toSql()).to.equal("insert into users (first_name,last_name) values (name,test),(name2,test2),(name3,test3);");
        });
    });

});