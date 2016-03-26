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

            expect(builder.toSql()).to.equal("select * from `users`;");
        });

        it("should compile a select query with specific columns", function () {

            builder.table('users')
                .select('1', '2', '3');

            expect(builder.toSql()).to.equal("select `1`, `2`, `3` from `users`;");
        });

        it("should compile a distinct select query with specific columns", function () {

            builder.table('users')
                .select('1', '2', '3')
                .distinct();

            expect(builder.toSql()).to.equal("select distinct `1`, `2`, `3` from `users`;");
        });

        it("should compile a select count query", function () {

            builder.table('users')
                .select()
                .count();

            expect(builder.toSql()).to.equal("select count(*) from `users`;");
        });

        it("should compile a select count as query", function () {

            builder.table('users')
                .select()
                .count('*', 'count');

            expect(builder.toSql()).to.equal("select count(*) as count from `users`;");
        });

        it("should compile a select count query with escaped column", function () {

            builder.table('users')
                .select()
                .count('active');

            expect(builder.toSql()).to.equal("select count(`active`) from `users`;");
        });

        it("should compile a select count query with escaped column", function () {

            builder.table('users')
                .select()
                .count('active', 'count');

            expect(builder.toSql()).to.equal("select count(`active`) as count from `users`;");
        });

        it("should compile a select count query with other columns", function () {

            builder.table('users')
                .select(1, 2)
                .count('active', 'count');

            expect(builder.toSql()).to.equal("select 1, 2, count(`active`) as count from `users`;");
        });

        it("should compile a select count distinct query", function () {

            builder.table('users')
                .select()
                .countDistinct();

            expect(builder.toSql()).to.equal("select count(distinct *) from `users`;");
        });

        it("should compile a select count distinct as query", function () {

            builder.table('users')
                .select()
                .countDistinct('*', 'count');

            expect(builder.toSql()).to.equal("select count(distinct *) as count from `users`;");
        });

        it("should compile a select count distinct query with escaped column", function () {

            builder.table('users')
                .select()
                .countDistinct('active');

            expect(builder.toSql()).to.equal("select count(distinct `active`) from `users`;");
        });

        it("should compile a select count distinct query with escaped column", function () {

            builder.table('users')
                .select()
                .countDistinct('active', 'count');

            expect(builder.toSql()).to.equal("select count(distinct `active`) as count from `users`;");
        });

        it("should compile a select count distinct query with other columns", function () {

            builder.table('users')
                .select(1, 2)
                .countDistinct('active', 'count');

            expect(builder.toSql()).to.equal("select 1, 2, count(distinct `active`) as count from `users`;");
        });


        it("should compile a select sum query", function () {

            builder.table('users')
                .select()
                .sum();

            expect(builder.toSql()).to.equal("select sum(*) from `users`;");
        });

        it("should compile a select sum as query", function () {

            builder.table('users')
                .select()
                .sum('*', 'sum');

            expect(builder.toSql()).to.equal("select sum(*) as sum from `users`;");
        });

        it("should compile a select sum query with escaped column", function () {

            builder.table('users')
                .select()
                .sum('active');

            expect(builder.toSql()).to.equal("select sum(`active`) from `users`;");
        });

        it("should compile a select sum query with escaped column", function () {

            builder.table('users')
                .select()
                .sum('active', 'sum');

            expect(builder.toSql()).to.equal("select sum(`active`) as sum from `users`;");
        });

        it("should compile a select sum query with other columns", function () {

            builder.table('users')
                .select(1, 2)
                .sum('active', 'sum');

            expect(builder.toSql()).to.equal("select 1, 2, sum(`active`) as sum from `users`;");
        });

        it("should compile a select sum distinct query", function () {

            builder.table('users')
                .select()
                .sumDistinct();

            expect(builder.toSql()).to.equal("select sum(distinct *) from `users`;");
        });

        it("should compile a select sum distinct as query", function () {

            builder.table('users')
                .select()
                .sumDistinct('*', 'sum');

            expect(builder.toSql()).to.equal("select sum(distinct *) as sum from `users`;");
        });

        it("should compile a select sum distinct query with escaped column", function () {

            builder.table('users')
                .select()
                .sumDistinct('active');

            expect(builder.toSql()).to.equal("select sum(distinct `active`) from `users`;");
        });

        it("should compile a select sum distinct query with escaped column", function () {

            builder.table('users')
                .select()
                .sumDistinct('active', 'sum');

            expect(builder.toSql()).to.equal("select sum(distinct `active`) as sum from `users`;");
        });

        it("should compile a select sum distinct query with other columns", function () {

            builder.table('users')
                .select(1, 2)
                .sumDistinct('active', 'sum');

            expect(builder.toSql()).to.equal("select 1, 2, sum(distinct `active`) as sum from `users`;");
        });






        it("should compile a select avg query", function () {

            builder.table('users')
                .select()
                .avg();

            expect(builder.toSql()).to.equal("select avg(*) from `users`;");
        });

        it("should compile a select avg as query", function () {

            builder.table('users')
                .select()
                .avg('*', 'avg');

            expect(builder.toSql()).to.equal("select avg(*) as avg from `users`;");
        });

        it("should compile a select avg query with escaped column", function () {

            builder.table('users')
                .select()
                .avg('active');

            expect(builder.toSql()).to.equal("select avg(`active`) from `users`;");
        });

        it("should compile a select avg query with escaped column", function () {

            builder.table('users')
                .select()
                .avg('active', 'avg');

            expect(builder.toSql()).to.equal("select avg(`active`) as avg from `users`;");
        });

        it("should compile a select avg query with other columns", function () {

            builder.table('users')
                .select(1, 2)
                .avg('active', 'avg');

            expect(builder.toSql()).to.equal("select 1, 2, avg(`active`) as avg from `users`;");
        });

        it("should compile a select avg distinct query", function () {

            builder.table('users')
                .select()
                .avgDistinct();

            expect(builder.toSql()).to.equal("select avg(distinct *) from `users`;");
        });

        it("should compile a select avg distinct as query", function () {

            builder.table('users')
                .select()
                .avgDistinct('*', 'avg');

            expect(builder.toSql()).to.equal("select avg(distinct *) as avg from `users`;");
        });

        it("should compile a select avg distinct query with escaped column", function () {

            builder.table('users')
                .select()
                .avgDistinct('active');

            expect(builder.toSql()).to.equal("select avg(distinct `active`) from `users`;");
        });

        it("should compile a select avg distinct query with escaped column", function () {

            builder.table('users')
                .select()
                .avgDistinct('active', 'avg');

            expect(builder.toSql()).to.equal("select avg(distinct `active`) as avg from `users`;");
        });

        it("should compile a select avg distinct query with other columns", function () {

            builder.table('users')
                .select(1, 2)
                .avgDistinct('active', 'avg');

            expect(builder.toSql()).to.equal("select 1, 2, avg(distinct `active`) as avg from `users`;");
        });


        it("should compile a select min query", function () {

            builder.table('users')
                .select()
                .min('id');

            expect(builder.toSql()).to.equal("select min(`id`) from `users`;");
        });

        it("should compile a select min as query", function () {

            builder.table('users')
                .select()
                .min('*', 'min');

            expect(builder.toSql()).to.equal("select min(*) as min from `users`;");
        });

        it("should compile a select min query with escaped column", function () {

            builder.table('users')
                .select()
                .min('active');

            expect(builder.toSql()).to.equal("select min(`active`) from `users`;");
        });

        it("should compile a select min query with escaped column", function () {

            builder.table('users')
                .select()
                .min('active', 'min');

            expect(builder.toSql()).to.equal("select min(`active`) as min from `users`;");
        });

        it("should compile a select min query with other columns", function () {

            builder.table('users')
                .select(1, 2)
                .min('active', 'min');

            expect(builder.toSql()).to.equal("select 1, 2, min(`active`) as min from `users`;");
        });


        it("should compile a select max query", function () {

            builder.table('users')
                .select()
                .max('id');

            expect(builder.toSql()).to.equal("select max(`id`) from `users`;");
        });

        it("should compile a select max as query", function () {

            builder.table('users')
                .select()
                .max('*', 'max');

            expect(builder.toSql()).to.equal("select max(*) as max from `users`;");
        });

        it("should compile a select max query with escaped column", function () {

            builder.table('users')
                .select()
                .max('active');

            expect(builder.toSql()).to.equal("select max(`active`) from `users`;");
        });

        it("should compile a select max query with escaped column", function () {

            builder.table('users')
                .select()
                .max('active', 'max');

            expect(builder.toSql()).to.equal("select max(`active`) as max from `users`;");
        });

        it("should compile a select max query with other columns", function () {

            builder.table('users')
                .select(1, 2)
                .max('active', 'max');

            expect(builder.toSql()).to.equal("select 1, 2, max(`active`) as max from `users`;");
        });
        
        

        it("should compile a select query with a raw where NOTE THE NONE ESCAPED WHERE COLUMNS!", function () {

            builder.table('users')
                .whereRaw('first_name = ?');

            expect(builder.toSql()).to.equal("select * from `users` where first_name = ?;");
        });

        it("should compile a select query with a simple where", function () {

            builder.table('users')
                .where('first_name', 'name');

            expect(builder.toSql()).to.equal("select * from `users` where `first_name` = ?;");
        });

        it("should compile a select query with a simple operator where", function () {

            builder.table('users')
                .where('first_name', '!=',  'name');

            expect(builder.toSql()).to.equal("select * from `users` where `first_name` != ?;");
        });

        it("should compile a select query with a and where", function () {

            builder.table('users')
                .where('first_name', 'name')
                .andWhere(function(q){
                    q.where('last_name', 'last')
                    .where('active', true);
                });

            expect(builder.toSql()).to.equal("select * from `users` where `first_name` = ? and (`last_name` = ? and `active` = ?);");
        });

        it("should compile a select query with a or where", function () {

            builder.table('users')
                .where('first_name', 'name')
                .orWhere(function(q){
                    q.where('last_name', 'last')
                        .where('active', true);
                });

            expect(builder.toSql()).to.equal("select * from `users` where `first_name` = ? or (`last_name` = ? and `active` = ?);");
        });

        it("should compile a select query with a where between", function () {

            builder.table('users')
                .whereBetween('first_name', [1, 100]);

            expect(builder.toSql()).to.equal("select * from `users` where `first_name` between ? and ?;");
        });

        it("should compile a select query with a where not between", function () {

            builder.table('users')
                .whereNotBetween('first_name', [1, 100]);

            expect(builder.toSql()).to.equal("select * from `users` where `first_name` not between ? and ?;");
        });

        it("should compile a select query with a where in", function () {

            builder.table('users')
                .whereIn('first_name', [1, 100]);

            expect(builder.toSql()).to.equal("select * from `users` where `first_name` in ( ? );");
        });

        it("should compile a select query with a where not in", function () {

            builder.table('users')
                .whereNotIn('first_name', [1, 100]);

            expect(builder.toSql()).to.equal("select * from `users` where `first_name` not in ( ? );");
        });

        it("should compile a select query with a where null", function () {

            builder.table('users')
                .whereNull('first_name');

            expect(builder.toSql()).to.equal("select * from `users` where `first_name` is null;");
        });

        it("should compile a select query with a where not null", function () {

            builder.table('users')
                .whereNotNull('first_name');

            expect(builder.toSql()).to.equal("select * from `users` where `first_name` is not null;");
        });

        it("should compile a select query with a where exists", function () {

            builder.table('users')
                .where('first_name', 'name')
                .whereExists(function(q){
                    q.select()
                        .from('orders')
                        .whereRaw('orders.user_id = users.id')
                });

            expect(builder.toSql()).to.equal("select * from `users` where `first_name` = ? and exists (select * from `orders` where orders.user_id = users.id);");
        });

        it("should compile a select query with order", function () {

            builder.table('users')
                .where('first_name', 'name')
                .orderBy('email', 'asc');

            expect(builder.toSql()).to.equal("select * from `users` where `first_name` = ? order by `email` asc;");
        });

        it("should compile a select query with order raw", function () {

            builder.table('users')
                .where('first_name', 'name')
                .orderByRaw('email NULLS LAST DESC');

            expect(builder.toSql()).to.equal("select * from `users` where `first_name` = ? order by email NULLS LAST DESC;");
        });

        it("should compile a select query with limits", function () {

            builder.table('users')
                .where('first_name', 'name')
                .skip(5)
                .take(10);

            expect(builder.toSql()).to.equal("select * from `users` where `first_name` = ? limit 5,10;");
        });

        it("should compile a select query with groupBy", function () {

            builder.table('users')
                .where('first_name', 'name')
                .groupBy('email', 'valid');

            expect(builder.toSql()).to.equal("select * from `users` where `first_name` = ? group by `email`, `valid`;");
        });



        it("should compile a insert query with data", function () {

            builder.table('users')
                .insert([
                    {
                        first_name: 'name',
                        last_name: 'test'
                    }
                ]);

            expect(builder.toSql()).to.equal("insert into `users` (`first_name`,`last_name`) values (?,?);");
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

            expect(builder.toSql()).to.equal("insert into `users` (`first_name`,`last_name`) values (?,?),(?,?),(?,?);");
        });

        it("should compile a update query with mass data and where", function () {

            builder.table('users')
                .where('id', 1)
                .update({
                    first_name: 'name',
                    last_name: 'test'
                });

            expect(builder.toSql()).to.equal("update `users` set `first_name` = ?, `last_name` = ? where `id` = ?;");
        });

        it("should compile a delete query", function () {

            builder.table('users')
                .delete();

            expect(builder.toSql()).to.equal("delete from `users`;");
        });

        it("should compile a delete query with where", function () {

            builder.table('users')
                .where('id', 1)
                .delete();

            expect(builder.toSql()).to.equal("delete from `users` where `id` = ?;");
        });

        it("should compile a delete query with limit", function () {

            builder.table('users')
                .skip(5)
                .take(10)
                .delete();

            expect(builder.toSql()).to.equal("delete from `users` limit 5,10;");
        });

        it("should compile a delete query with order by", function () {

            builder.table('users')
                .orderBy('email', 'asc')
                .delete();

            expect(builder.toSql()).to.equal("delete from `users` order by `email` asc;");
        });

        it("should compile a simple truncate query", function () {

            builder.table('users').truncate();

            expect(builder.toSql()).to.equal("truncate `users`;");
        });


        it("should compile a union query", function () {

            builder.table('users')
                .select('first_name', 'last_name')
                .where('admin', true)
                .union(function(b){
                    b.table('clients')
                        .select('first_name', 'last_name')
                        .where('active', true);
                });

            expect(builder.toSql()).to.equal("(select `first_name`, `last_name` from `users` where `admin` = ?) union (select `first_name`, `last_name` from `clients` where `active` = ?);");
        });

        it("should compile a multi union query", function () {

            builder.table('users')
                .select('first_name', 'last_name')
                .union(function(b){
                    b.table('clients')
                        .select('first_name', 'last_name');
                })
                .union(function(b){
                    b.table('admins')
                        .select('first_name', 'last_name');
                });

            expect(builder.toSql()).to.equal("(select `first_name`, `last_name` from `users`) union (select `first_name`, `last_name` from `clients`) union (select `first_name`, `last_name` from `admins`);");
        });

        it("should compile a union query with orderby", function () {

            builder.table('users')
                .select('first_name', 'last_name')
                .union(function(b){
                    b.table('clients')
                        .select('first_name', 'last_name');
                })
                .orderBy('first_name', 'asc');

            expect(builder.toSql()).to.equal("(select `first_name`, `last_name` from `users`) union (select `first_name`, `last_name` from `clients`) order by `first_name` asc;");
        });

        it("should compile a union all query", function () {

            builder.table('users')
                .select('first_name', 'last_name')
                .unionAll(function(b){
                    b.table('clients')
                        .select('first_name', 'last_name');
                });

            expect(builder.toSql()).to.equal("(select `first_name`, `last_name` from `users`) union all (select `first_name`, `last_name` from `clients`);");
        });

        it("should compile a multi union all query", function () {

            builder.table('users')
                .select('first_name', 'last_name')
                .unionAll(function(b){
                    b.table('clients')
                        .select('first_name', 'last_name');
                })
                .unionAll(function(b){
                    b.table('admins')
                        .select('first_name', 'last_name');
                });

            expect(builder.toSql()).to.equal("(select `first_name`, `last_name` from `users`) union all (select `first_name`, `last_name` from `clients`) union all (select `first_name`, `last_name` from `admins`);");
        });

        it("should compile a union all query with orderby", function () {

            builder.table('users')
                .select('first_name', 'last_name')
                .unionAll(function(b){
                    b.table('clients')
                        .select('first_name', 'last_name');
                })
                .orderBy('first_name', 'asc');

            expect(builder.toSql()).to.equal("(select `first_name`, `last_name` from `users`) union all (select `first_name`, `last_name` from `clients`) order by `first_name` asc;");
        });

        it("should compile a select query with a group by", function () {

            builder.table('users')
                .whereRaw('`first_name` = ?')
                .groupBy('account');

            expect(builder.toSql()).to.equal("select * from `users` where `first_name` = ? group by `account`;");
        });

        it("should compile a select query with a group by raw", function () {

            builder.table('users')
                .whereRaw('`first_name` = ?')
                .groupByRaw('year WITH ROLLUP');

            expect(builder.toSql()).to.equal("select * from `users` where `first_name` = ? group by year WITH ROLLUP;");
        });


        it("should compile a select query with a raw having", function () {

            builder.table('users')
                .whereRaw('`first_name` = ?')
                .groupBy('account')
                .havingRaw('`amount` > ?', [100]);

            expect(builder.toSql()).to.equal("select * from `users` where `first_name` = ? group by `account` having `amount` > ?;");
        });

        it("should compile a select query with a simple having", function () {

            builder.table('users')
                .groupBy('account')
                .having('amount', '>', 100);

            expect(builder.toSql()).to.equal("select * from `users` group by `account` having `amount` > ?;");
        });

        it("should compile a select query with simple having(s)", function () {

            builder.table('users')
                .groupBy('account')
                .having('amount', '>', 100)
                .having('amount', '<', 1000);

            expect(builder.toSql()).to.equal("select * from `users` group by `account` having `amount` > ? and `amount` < ?;");
        });


        it("should compile a select query with a and having", function () {

            builder.table('users')
                .groupBy('account')
                .having('amount', '>', 100)
                .andHaving(function(q){
                    q.having('credit', '<', 100)
                        .having('active', '=', true);
                });

            expect(builder.toSql()).to.equal("select * from `users` group by `account` having `amount` > ? and (`credit` < ? and `active` = ?);");
        });


        it("should compile a select query with a or having", function () {

            builder.table('users')
                .groupBy('account')
                .having('amount', '>', 100)
                .orHaving(function(q){
                    q.having('credit', '<', 100)
                        .having('active', '=', true);
                });

            expect(builder.toSql()).to.equal("select * from `users` group by `account` having `amount` > ? or (`credit` < ? and `active` = ?);");
        });


    });

});