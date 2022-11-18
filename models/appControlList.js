const appcontrollist = require("../schemas/AppControlList");
const Promise    = require("bluebird");

function AppControlList() {
    this.model = appcontrollist;
}

AppControlList.prototype.dropData = function () {
    return this.model.deleteMany({});
}

AppControlList.prototype.insertData = function (body) {

    var p = this.model({"data": body}).save()
    return p.then(function (res) {
        return res;
    })
}

AppControlList.prototype.getData = function (body) {

    var p = this.model.find({})
    return p.then(function (res) {
        return res;
    })
}



module.exports = new AppControlList()
