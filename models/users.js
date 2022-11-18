const userScheme = require("../schemas/users");
const Promise    = require("bluebird");
const { v4: uuidv4 } = require('uuid');

function Users() {
    this.model = userScheme;
}

Users.prototype.getUsers = function () {
    return Promise.resolve(this.model.find({}));
}

Users.prototype.insertUser = function(body) {
    var p = this.model(body).save()
    return p.then(function (res) {
        return res;
    })
}

Users.prototype.getUserByemailId = function(emailId){
    return this.model.findOne({email: emailId});
}

Users.prototype.updateByCondition = function (condition, body) {
    console.log('=========================== here is the condition and body', condition, body);
    return this.model.findOneAndUpdate(condition, body);
}

Users.prototype.getUserByToken = function(token) {
    return this.model.findOne({passHash: token});
}


Users.prototype.getInactiveUsers = function (condition) {
    return this.model.find(condition)
}

module.exports = new Users()
