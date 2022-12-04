
const mongoose = require('../dbconnection');

//Define a schema


let course = new mongoose.Schema({
  email: String,
  prof_name: String,
  semester: String,
  college: String,
  courseLevel: String,
  department: String,
  mode: String,
  courseName: String,
  course: String,
  Syllabus: String,
  grading: mongoose.Schema.Types.Mixed,
  year: String,
  grades: mongoose.Schema.Types.Mixed,
  fileName: String,
  createdOn: {
    type: Date,
    default: Date.now()
  }
});

const model = mongoose.model("course", course);

module.exports = model;