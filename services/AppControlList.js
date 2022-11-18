var appControlListModel = require("../models/appControlList")
const Promise = require("bluebird");
var bcrypt = require('bcrypt');
function AppControlList() {
    this.appControlListModel = appControlListModel
}

AppControlList.prototype.insertData = function(data) {
    return this.appControlListModel.insertData(data).then(function (res) {
        return res;
    })
    .catch(function (err) {
        console.log('========================== Err at insertData AppcontrolList Service', err);
    })
}

AppControlList.prototype.dropData = function () {
    return this.appControlListModel.dropData().then(function (res) {
        return res;
    })
    .catch(function (err) {
        console.log('========================== Error in dropdata Appcontrollist service ', err);
    })
}

AppControlList.prototype.getAppControlListData = function () {
    return this.appControlListModel.getData().then(function (res) {
        return res;
    })
}

module.exports = new AppControlList();