const Promise    = require("bluebird");
const commentsModel = require("../schemas/comments");

function CommentsModel() {
    this.model = commentsModel;
}

CommentsModel.prototype.getCommentBycourseId = function (query) {
    return this.model.find(query);    
}

CommentsModel.prototype.updateCommentById = function(commentId, replies) {
    return this.model.findOneAndUpdate({_id: commentId}, replies);
}

CommentsModel.prototype.postComment = function(body) {
    console.log('================== here is the body', JSON.stringify(body))
    return this.model(body).save();
}

CommentsModel.prototype.allComments = function (body) {
    if(!body) {
        body = {};
    }
    return this.model.find(body);
}

CommentsModel.prototype.deleteComment = function (condition) {
    return this.model.remove(condition);
}

module.exports = new CommentsModel()
