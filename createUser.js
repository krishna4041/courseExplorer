var userSerice = require("./services/users");
const bcrypt = require('bcrypt');


console.log('================ here are the arguments', process.argv.length)
if (process.argv.length !== 4){
    console.error(' Expected at 2 arguments');
    process.exit(0);
}


var userEmail = process.argv[2];
const myPlaintextPassword = process.argv[3];
const saltRounds = 10;

const salt = bcrypt.genSaltSync(saltRounds);
const hash = bcrypt.hashSync(myPlaintextPassword, salt);

function start() {
    return userSerice.insertUser({email: userEmail, passHash: hash}).then(function (res) {
        console.log({"Status": "Sucess"});
        process.exit(0);
    })
    .catch(function (err) {
        console.log({"Status": err});
        process.exit(1);
    })
}



start();