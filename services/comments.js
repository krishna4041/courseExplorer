var commentsModel = require('../models/comments');
const promise = require("bluebird")


function CommentService() {
    this.commentsModel = commentsModel;
}


CommentService.prototype.getCommentBycourseId = function(courseId) {
    return this.commentsModel.getCommentBycourseId({courseId: courseId});
}

CommentService.prototype.updateCommentById = function(commentId, replies){
    return this.commentsModel.updateCommentById(commentId, {replies});
}

CommentService.prototype.postComment = function(body) {
    return this.commentsModel.postComment(body);
}

CommentService.prototype.allComments = function () {
    return this.commentsModel.allComments();
}



module.exports = new CommentService();