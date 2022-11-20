var commentsModel = require('../models/comments');
const promise = require("bluebird")


function CommentService() {
    this.commentsModel = commentsModel;
}


CommentService.prototype.getCommentBycourseId = function(courseId) {
    return this.commentsModel.getCommentBycourseId({courseId: courseId}).then(function (comments) {
        return promise.map(comments, function (comment) {
            if (!comment.replies) {
                comment.replies = [];
            }
            return comment;
        })
    })
}

CommentService.prototype.updateCommentById = function(commentId, r){
    var self = this;
    return this.commentsModel.getCommentBycourseId({_id: commentId}).then (function (comment) {
        if(comment) {
            comment = comment[0];
        }
        var replies = [];
        if (comment.replies) {
            comment.replies.push(r.replies);
            replies = comment.replies;
        }
        console.log('============================== here are the comments', JSON.stringify(replies));
        return self.commentsModel.updateCommentById(commentId, {replies});
    })
}


CommentService.prototype.postComment = function(body) {
    return this.commentsModel.postComment(body);
}

CommentService.prototype.allComments = function () {
    return this.commentsModel.allComments().then(function (comments) {
        return promise.map(comments, function (comment) {
            if (!comment.replies) {
                comment.replies = [];
            }
            return comment;
        })
    })
}



module.exports = new CommentService();