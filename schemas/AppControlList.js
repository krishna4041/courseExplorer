
const mongoose = require('../dbconnection');

//Define a schema


let appcontrollist = new mongoose.Schema({
    data:  mongoose.Schema.Types.Mixed
});

const model = mongoose.model("appcontrollist", appcontrollist);

module.exports = model;