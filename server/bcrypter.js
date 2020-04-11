const bcrypt = require('bcryptjs');
const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("¿Clave a encriptar?", clave => {

    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(clave, salt);

    console.log(hash);
    rl.close();

});

rl.on("close", () => {

    console.log('k bye.');
    process.exit();

});
