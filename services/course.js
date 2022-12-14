var courseModel = require('../models/course');
const promise = require("bluebird")
var commentsService = require('../services/comments');

function courseService() {
    this.courseModel = courseModel
}


courseService.prototype.insertCourse = function(body) {
    return this.courseModel.postCourse(body);
}

courseService.prototype.updateCourse = function(courseId, body){
    return this.courseModel.updateCourse(courseId, body);
}

courseService.prototype.getCourseByBody = function(body) {
    return this.courseModel.getCourseByBody(body).then (function (res) {
        return promise.map(res, function (r) {
            return commentsService.getCommentBycourseId(r._id).then(function (commentInfo) {
                return {course: r, comments : commentInfo};
            })
        })
        console.log('================================== res at line no 21', res);
    })
}
courseService.prototype.getallCourses = function () {
    return this.courseModel.getallCourses();
}

courseService.prototype.getCourseByEmail = function (email) {
    return this.courseModel.getCourseByBody({email});
}

courseService.prototype.deleteCourse = function(courseId) {
    return this.courseModel.deleteCourse({_id: courseId});
}



module.exports = new courseService();