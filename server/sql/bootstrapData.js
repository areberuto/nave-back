const { dropTables, createTables, seedTables } = require('./queries');
const { con } = require('./mysql');

dropTables().then(msg => {

    console.log(msg);
    return createTables();

}).then(msg => {

    console.log(msg);
    return seedTables();

}).then(msg => {

    console.log(msg);
    con.end(function(err) {

        if(err){

            return err;

        }

    });

}).catch(err => {

    console.log("Algo ha ido mal:", err);

});