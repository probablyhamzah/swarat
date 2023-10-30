const express = require('express')
const app = express()
const cors = require('cors')

const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const router = express.Router();
const mongoose = require("mongoose");
const path = require("path");

const multer = require("multer");
const upload = multer({ dest: "uploads/" });
fs = require('fs');
//require('dotenv').config()

require("dotenv").config({ path: "./config.env" });

const User = require('./models/user')
const Post = require('./models/post')
const Chat = require('./models/chat')

app.use(express.json())
app.use(cors({
  origin : 'http://localhost:3000', //(Whatever your frontend url is) 
    credentials: true, // <= Accept credentials (cookies) sent by the client
}))

app.use(express.urlencoded({ extended: false }));

app.use(session({

    secret: 'Your_Secret_Key',

    resave: true,

    saveUninitialized: true
}))

const url = process.env.DB_URI;

console.log('connecting to', url)
mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })


var localltd, locallng;

var coords = {};
function toRad(degree) {
    return 3.14 * degree / 180;
}

app.use(express.json());


app.get('/users', (request, response) => {
    User.findOne({ username: request.session.username }).then(users => {
        response.json(users)
    })
})

app.get('/posts', (request, response) => {
    Post.find({}).then(post => {
        response.json(post)
    })
})


app.post('/add', (request, response) => {
    const body = request.body


    const user = new User({
        username: body.username,
        password: body.password,
    })
    console.log(user);
    user.save().then(savedUser => {
        response.json(savedUser)
    })
})


app.post('/register', (request, response) => {
    const body = request.body

    const user = new User({
        username: body.username,
        password: body.password,
        
        uploaded: [],
        volunteering: []
    })

    const sessUser = { username: user.username, password: user.password };
    request.session.user = sessUser;
    console.log("User session cookie: ");
    console.log(request.session.user);

    user.save().then(savedUser => {
        response.json(savedUser)
    })

})

app.post('/login', (request, response) => {    
    const body = request.body

    
    const user = User.findOne({ username: body.username }).then(user => {

    if (user.password === body.password) {
        var name = user.username
        request.session.username = body.username;
        request.session.userid = user._id;

        console.log(request.session.username, request.session.userid);
    }
    request.session.username = body.username
    request.session.userid = user._id
    
    return response.send(request.session.username)
    
    })
  
    
})

app.post('/savePost', (request, response) => {
    const post = new Post({
        pictures: request.pictures,
        owner: request.session.userid || request.session.userid,
        volunteers: [],
        location: {
            lat: locallat,
            lng: locallng

        }
    })
    post.save().then(savedPost => {
        response.json(post);
    })

})


app.post("/upload_files", upload.array("files"), uploadFiles);

function uploadFiles(req, res) {
    const chat = new Chat({
        users: [req.session.userid],
        messages: []
    });
    chat.save();

    User.findOne({ username: req.session.username }).then(users => {
        const post = new Post({
            pictures: req.files[0].filename,
            description: req.body.textarea,
            owner: users._id,
            volunteers: [users._id],
            location: { "lat": req.body.lat, "lng": req.body.lng },
            chatid: chat.id
        })
        post.save();
                
    })

    res.json({ message: "Successfully uploaded files" });
}

app.get('/getPopulate', (request, response) => {
    Post.find().then(posts => {
        response.json(posts)
    })
})

app.get('/deletePost', (request, response) => {
    Post.deleteOne({description:"big text"}).then(posts => {
        response.json(posts)
    })
})


app.get('/download/:id', function(req, res){
 
    var filePath = "uploads/" + req.params.id;
    console.log(filePath);
 
    fs.exists(filePath, function (exists) {
 
        if (!exists) {
            res.writeHead(404, {
                "Content-Type": "text/plain" });
            res.end("404 Not Found");
            return;
        }
 
 
        var contentType = "text/plain";
 
        res.writeHead(200, {
            "Content-Type": "image/png" });
 
        fs.readFile(filePath,
            function (err, content) {
                // Serving the image
                res.end(content);
            });
    });

});

app.get('/getUser', (request, response) => {
    response.json({"username": request.session.username, "userid": request.session.userid});
})

app.post('/sendText', (request, response) => {
    console.log('reached to sendText')
    console.log(request.session.userid)
    console.log(request.message)
    Chat.updateOne(
        {iden:0},
        {"$push": {'messages': {sent: request.session.userid, message: request.message || "hello"}}}
    )

})

app.get('/createAndUpdate', (request, response) => {
    

    const chat = new Chat({
        users: [request.session.userid],
        messages: [{sent: request.session.userid, message: "hello"}]
    });
    chat.save();

    Chat.updateOne(
        {"_id": chat._id},
        {"$push": {"messages": {sent: request.session.userid, message: "hey"}}},function(err,doc) {
                    if(err){
                        console.log(err);
                    }
                    console.log('updated')        
                }
    )

    
    console.log(chat._id)
        response.send('<h1>Hello World!</h1>')

})

app.get('/chatupdate', (request, response) => {
    
    Chat.updateOne(
        {"_id": "6376c1e76ad15558d60aac22"},
        {"$push": {"messages": {sent: request.session.userid, message: "hey"}}},function(err,doc) {
                    if(err){
                        console.log(err);
                    }
                    console.log('updated')        
                }
    )
        response.send('<h1>Hello World!</h1>')

})


app.get('/getCookies', (request, response) => {
    User.findOne({ username: request.session.username }).then(users => {
        request.session.username = users.username,
        request.session.userid = users._id
    })
    response.send('')

})


app.post('/updateChat', (request, response) => {
    console.log(request.body.message)
    
    const obj = {message: request.body.message, userid: request.session.userid, username: request.session.username}
    console.log('obj' + request.body.user)
    Chat.updateOne(

        {_id:request.session.chatid},
        {$push: {messages: obj}},function(err,doc) {
            if(err){
                console.log(err);
            }
            console.log('chat updated')        
        } 
    )
    response.send('')

})

app.get('/getMessages', (request, response) => {
    Chat.findOne({_id:request.session.chatid}).then(chat =>{
        response.json(chat.messages)
    })

})

app.get('/showChats', (request, response) => {
    Chat.find({}).then(chats => {
        response.json(chats)
    })

})

app.get('/clickedOnPost', (request, response) => {
    
    const id = request.query.id;
    
    
    
    Post.updateOne(
        {_id:id},
        {$push: {volunteers: request.session.userid}},function(err,doc) {
                    if(err){
                        console.log(err);
                    }
                    console.log('updated')        
                } 
    )
    
    User.updateOne(
        {username:request.session.username},
       {$push: {volunteering: id}},function(err,doc) {
                    if(err){
                        console.log(err);
                    }
                    console.log('updated')        
                } 
    )
    
    
    console.log(id);
    Post.findOne({_id:id}).then(post => {
    console.log("post" + post);
        coords.lat = post.location.lat;
        coords.lng = post.location.lng ;   
        console.log("coords:" + coords.lat + ' ' + coords.lng);
    })
    
})

app.get('/getTheCoords', (request, response) =>{
    console.log(coords.lat + ' ' + coords.lng)
    response.json({lat: coords.lat, lng: coords.lng});
})


app.get('/userPosts', (request, response) => {
    User.findOne({username:request.session.username}).then(user => {
            response.json(user.uploaded)
    })
})

app.get('/allPosts', (request, response) => {
    
    Post.find({}).then(posts => {
        
            response.json(posts)
    })

})

app.get('/userVolunteered', (request, response) => {

         Post.find({}).then(posts => {
              
              response.json(posts)
          })
})

app.post('/setChatID', (request, response) => {
    console.log(request.body.chatid)
    request.session.chatid = request.body.chatid;
    response.send('entered')
})


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

