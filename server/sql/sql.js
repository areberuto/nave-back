const sqlite3 = require('sqlite3');

const db = new sqlite3.Database('../data/database.db', err => {

    if (err)
        console.log(err);
    else
        console.log('Succesful connection to DB.');

});

module.exports = {db};