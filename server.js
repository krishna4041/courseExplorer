const express = require("express")
var app = express()
var UserService = require('./services/users.js');
var AppControlListService = require('./services/AppControlList');
var CommentService = require('./services/comments');
var CourseService = require('./services/course');
var cors = require('cors');


// var allowCrossDomain = function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Cache-Control");

//     // intercept OPTIONS method
//     if ('OPTIONS' == req.method) {
//       res.send(200);
//     }
//     else {
//       next();
//     }
// };
// app.use(allowCrossDomain);


app.use(cors())


app.get("/",function(request,response){
response.send("Hello World!")
})

app.use(express.json());


app.get('/ce/activateuser/:passhash', function (request, response) {
    var passHash = request.params.passhash;
    return UserService.activateUserWithHash(passHash).then (function (res) {
        return response.send(res);
    })
    .catch(function (err) {
        console.log('##################################################', err);
    })
})

app.get('/ce/getallusers', function (request, response) {
    return UserService.getAllUsers().then(function (res) {
        return response.send(res);
    })
})

app.post('/ce/activateuser', function (request, response) {
    return UserService.activateUser(request.body).then(function (res) {
        return response.send({});
    })
    .catch(function (err) {
        console.log('###########################################', err);
    })
})

app.get('/ce/getInactiveusers', function (request, response) {
    return UserService.getInactiveUsers().then(function (res) {
        return response.send(res);
    })
    .catch(function (err) {
        console.log('#######################################', err);
    })
})

app.post('/ce/Insertusers', function (request, response) {
    var body = request.body;
    console.log('========================================', body);
    return UserService.insertUser(body).then(function (res) {
        return response.send(res);
    })
    .catch(function (err) {
        console.log('##################################### ', err);
    })
})

app.post('/ce/login', function (request, response) {
    var body = request.body;

    return UserService.logIn(body).then(function (res) {
        if (res.status) {
            response.status(401)
            return response.send(res);
        }
        return response.send(res);
    })
    .catch(function (err) {
        console.log('##################################### ', JSON.stringify(err));
        return response.status(401).json(err);
    })
})

app.post('/ce/passwordreset', function (request, response) {
    return UserService.passwordReset(request).then(function (res) {
        return response.send(res);
    })
})
app.post('/ce/changeStatus', function (request, response) {
    return UserService.changeStatus(request.body.email, request.body.status).then(function (res) {
        return response.send({});
    })
})



app.get('/ce/appControlList', function (request, response) {
    return AppControlListService.getAppControlListData().then(function (res) {
        return response.send(res);
    })
})





// Comments

app.post('/ce/comments', function (request, response) {
    var courseId = request.params.courseId;
    console.log("============================== obdy", JSON.stringify(request.body))
    return CommentService.postComment(request.body).then(function (res) {
        response.send(res);
    })
    .catch(function (err) {
        console.log('####################################', err);
        return response.status(400);
    })
})

app.get('/ce/comments/:courseId', function (request, response) {
    return CommentService.getCommentBycourseId(request.query.courseId).then(function (res) {
        response.send(res);
    })
    .catch(function (err) {
        console.log('#########################################', err);
        return response.status(400);
    })
})


app.get('/ce/allComments', function (request, response) {
    return CommentService.allComments().then(function (res) {
        response.send(res);
    })
    .catch(function (err) {
        console.log('#########################################', err);
        return response.status(400);
    })
})



app.put('/ce/updatecomment/:commentId', function (request, response) {
    return CommentService.updateCommentById(request.params.commentId, request.body).then(function (res) {
        return response.send(res);
    })
    .catch(function (err) {
        console.log('############################################', err);
        return response.status(400);
    })
})


// Course



app.post('/ce/insertCourse', function (request, response) {
    return CourseService.insertCourse(request.body).then(function (res) {
        return response.send(res);
    })
    .catch(function (err) {
        console.log('####################################################', err);
        return response.status(400);
    })
})


app.get('/ce/getCourseByEmail/:email', function (request, response) {
    var email =  request.params.emailId;
    return CourseService.getCourseByEmail(email).then (function (res) {
        return response.send(res);
    })
})

app.post('/ce/getCourse', function (request, response) {
    console.log("=================================== get course", JSON.stringify(request.headers),request.body )
    return CourseService.getCourseByBody(request.body).then (function (res) {
        console.log('================================= here is the response', res)
        return response.send(res);
    })
    .catch(function (err) {
        console.log('================================================', err);
        return response.send(err);
    })
})

app.post('/ce/post', function (request, response) {
    console.log("=================================== ", JSON.stringify(request.body),request.body )
    return response.send({"status": "success"});
})


app.get('/ce/getallCourses', function (request, response) {
    return CourseService.getallCourses().then (function (res) {
        return response.send(res);
    })
    .catch(function (err) {
        console.log('================================================', err);
        return response.send(err);
    })
})

app.post('/ce/updateCourse/:courseId', function (request, response) {
    return CourseService.updateCourse(request.params.courseId, request.body).then(function (res) {
        return response.send(res);
    })
    .catch(function (err) {
        console.log('======================================================',err);
        return response.send(err);
    })
})

app.listen(3000, function () {
console.log("Started application on port %d", 3000)
});