var Manager = require('./lib/manager');

var db = new Manager();

/*
db.connection().table('users').insert({
    first_name: 'lee',
    last_name: 'mason'
}).then(function(results){
    console.log(results);
}).catch(function(err){
    console.log(err);
});

return;
*/

db.connection()
    .table('users')
    .take(1)
    .get()
    .then(function(results, fields){
        console.log(results, fields);
    }).catch(function(err){
        console.log(err);
    });

return;

var sql = db
            .connection()
            .table('users')
            .select('first_name', 'email')
            .where('first_name', 'Lee')
            .where('last_name', '!=', 'Mason')
            .andWhere(function(q){
                q.where('admin', true);
                q.where('active', false);
            })
            .orWhere(function(q){
                q.where('active', true);
                q.where('admin', false);
            })
            .whereBetween('balance', [10, 100])
            .whereNotBetween('balance', [80, 90])
            .whereIn('balance', [10, 100])
            .whereNotIn('balance', [80, 90])
            .whereNull('nullable')
            .whereNotNull('nullable')
            .whereExists(function(q){
                q.select(1).
                    from('orders').
                    whereRaw('orders.user_id = users.id');
            })
            .orderBy('first_name', 'asc')
            .orderBy('email', 'desc')
            .skip(5)
            .take(10);

console.log(sql.get());