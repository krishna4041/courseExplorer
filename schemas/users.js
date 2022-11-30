
const mongoose = require('../dbconnection');

//Define a schema


let users = new mongoose.Schema({
  email: {
    type: String,
    unique: true
  },
  passHash: String,
  status: {
    type: String,
    enum : ['active','inactive', 'pending', "suspended"],
    default: 'inactive'
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  updatedAt: Date
});

const model = mongoose.model("users", users);

module.exports = model;