const Promise    = require("bluebird");
const courseModelSchema = require("../schemas/course");

function courseModel() {
    this.model = courseModelSchema;
}


courseModel.prototype.getCourseByBody = function(body) {
    return this.model.find(body);
}


courseModel.prototype.postCourse = function(body) {
    return this.model(body).save();
}

courseModel.prototype.updateCourse = function(courseId, body) {
    return this.model.findOneAndUpdate({_id: courseId}, body);
}

courseModel.prototype.getallCourses = function () {
    return this.model.find({});
}

module.exports = new courseModel();