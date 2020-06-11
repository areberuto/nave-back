const mysql = require('mysql');

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "nave",
    dateStrings: true
});

con.connect(function(err) {

    if (err) throw err;
    console.log("DB connection - OK.");

});

module.exports = {con};