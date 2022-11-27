
const mongoose = require('../dbconnection');

//Define a schema


let comments = new mongoose.Schema({
  courseId: String,
  email: String,
  firstName: String,
  lastName: String,
  comment: String,
  replies: mongoose.Schema.Types.Mixed,
  createdOn: {
    type: Date,
    default: Date.now()
  },
  status: {
    type: String,
    enum : ['valid','invalid'],
    default: 'valid'
  },
});

const model = mongoose.model("comments", comments);

module.exports = model;