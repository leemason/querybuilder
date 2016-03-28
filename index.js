var Manager = require('./lib/manager'),
    Repository = require('./lib/repository'),
    Model = require('./lib/model');


var User = Model.extend({

    attributes: {
        first_name: 'string',
        last_name: {
            type: 'string'
        },
        email: {
            type: 'string',
            default: 'you need an email!'
        }
    },

    getName: function(){
        return this.get('first_name') + ' ' + this.get('last_name');
    }
});

var UserRepo = Repository.extend({
    model: User,
    tableName: 'users',
    connection: Manager.connection()
});

var repo = new UserRepo();

repo.find(8).then(function(model){
    model.last_name = 'Mason';

    console.log(model.isDirty());

    repo.save(model).then(function(result){
        console.log(result);
    })
});

/*
repo
    .all()
    .then(function(results){
        console.log(results);
    });

repo
    .where(1, 1)
    .get()
    .then(function(results){
        console.log(results);
    });

repo
    .where(1, 1)
    .first()
    .then(function(results){
        console.log(results);
    });

repo
    .find(1)
    .then(function(results){
        console.log(results);
    });
*/
//console.log();


/*

Manager.connection()
    .table('users')
    .take(1)
    .first()
    .then(function(results, fields){
        return new User(results);
    })
    .then(function(obj){
        console.log(obj.toJSON());
        console.log(obj);
    }).catch(function(err){
        console.log(err);
    });

*/

return;

var sql = Manager
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