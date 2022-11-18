const mongoose  = require("mongoose");
const config = require('./config.json');

var connectionString = 'mongodb://' + config.db.host + ":" + config.db.port + "/" + "dbm001"
console.log(connectionString)
console.log('========================= here is the link')
mongoose.connect(connectionString, {
    useNewUrlParser: true,
});

var conn = mongoose.connection

conn.on('connected', function () {
    console.log('Database connected')
})
conn.on('disconnected', function () {
    console.log('MongoDB disconnected ')
})

conn.on('error', function() {
    console.log('error connecting to database')
})


module.exports = mongoose