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
        var courseId = res[0]._id;
        console.log('================================== res at line no 21', res);
        return commentsService.getCommentBycourseId(courseId).then(function (commentInfo) {
            return [{course: res[0], comments : commentInfo}];
        })
    })
}
courseService.prototype.getallCourses = function () {
    return this.courseModel.getallCourses();
}

module.exports = new courseService();