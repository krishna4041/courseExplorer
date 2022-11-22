var userModel = require("../models/users")
const Promise = require("bluebird");
var bcrypt = require('bcrypt');
function UserService() {
    this.userModel = userModel
}



UserService.prototype.validateToken = function (token) {
    return this.userModel.getUserByToken(token).then(function (res) {
        if (!res) {
            return {"status": "failure"};
        }
        if (res.isAdmin) {
            return {"status": "admin"};
        }
        return {"status": "success"};
    })
    .catch(function (err) {
        console.log("==== ERROR IN VALIDTE TOKEN", err);
    })
}

UserService.prototype.getAllUsers = function() {
    return this.userModel.getUsers().then(function (res) {
        return  res;
    });
}

UserService.prototype.insertUser = function(body) {
    body.passHash = bcrypt.hashSync(body.passHash, 10);
    return this.userModel.insertUser(body).then(function (res) {
        console.log('====== res123333333', res)
        return res
    }).catch(function (err) {
        return {"error": "Duplicate Email"};
    })
}


UserService.prototype.logIn = function (body) {
    var email = body.email, password = body.password;
    return this.userModel.getUserByemailId(email).then(function (res) {
        console.log("asdasdasdasd",res)
        if (!res) {
            throw {"status" : "User Not Found"};
        }
        if(res.status !== 'active') {
            return {"status" : "User Not Activated"};            
        }
        if (bcrypt.compareSync(password, res.passHash)) {
            return {"token": res.passHash, isAdmin: res.isAdmin, email: res.email};
        } else {
            return {"status" : "User Not Found"};
        }
    })
}

UserService.prototype.getInactiveUsers = function () {
    return this.userModel.getInactiveUsers({status: "inactive", isAdmin: false}).then(function (res) {
        return res;
    })
}

UserService.prototype.activateUser = function (body) {

    var email = body.email;
    var node_mailer = require('nodemailer');
    var pass = "ksyexbcoamvvqdms"

    let transporter = node_mailer.createTransport({
        service: 'gmail',
        auth: {
        user: 'krishna.5053@gmail.com',
        pass: pass
        }
    });

    return this.userModel.getInactiveUsers({email}).then (function (res) {
        res = res[0];
        console.log('========================== here is the email', JSON.stringify(res))
        var passHash = res.passHash;
        var link = 'http://localhost:3000/ce/activateUser/' + passHash + '/';
        let mailOptions = {
            from: 'krishna.5053@gmail.com',
            to: email,
            subject: 'Activation Link For Course Explorer',
            text: `Hello, please find the activation link below ${link}`
        };

        return new Promise(function (resolve, reject) {
            transporter.sendMail(mailOptions, function(err, data) {
                if (err) {
                console.log("Error " + err);
                } else {
                resolve({});
                console.log("Email sent successfully");
                }
            })
        })
    }).then (function (res) {
        console.log('===================== here at line 94')
        return res;
    })
}

UserService.prototype.activateUserWithHash = function (passHash) {
    console.log('======================================= here at line 102', passHash)
    return this.userModel.updateByCondition({passHash}, {status: "active"}).then (function (res) {
        res = "<html> <head>server Response</head><body><h1> Your Account Was Sucessfully Activated</p></h1></body></html>"
        return res;
    })
}

UserService.prototype.passwordReset = function (request) {
    var newPassword = request.body.password;
    var token = request.headers.token;
    var self = this;
    return this.validateToken(token).then (function (response) {
        if (response && response['status'] !== 'failure') {
            newPassword = bcrypt.hashSync(newPassword, 10);
            return self.userModel.updateByCondition({passHash: token}, {passHash: newPassword}).then (function (res) {
                return {"status": "success", "token": newPassword};
            })
        } else {
            return {"error": "wrong password"};
        }
    })
}

UserService.prototype.changeStatus = function (email, status) {
    return this.userModel.updateByCondition({email: email}, {status: status});
}

module.exports = new UserService();