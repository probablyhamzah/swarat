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
//app.use(express.static('build'))
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


//var request.session.username = "a@a", request.session.userid;
var localltd, locallng;

var coords = {};
function toRad(degree) {
    return 3.14 * degree / 180;
}

function distance(lat1, long1, lat2, long2) {
    lat1 = toRad(lat1);
    long1 = toRad(long1);
    lat2 = toRad(lat2);
    long2 = toRad(long2);

    const dlong = long2 - long1;
    const dlat = lat2 - lat1;

    const ans = pow(Math.sin(dlat / 2), 2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(sin(dlong / 2), 2);
    ans = 2 * 6371 * Math.asin(Math.sqrt(ans));

    return ans;
}



app.use(express.json());








app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
})

app.get('/users', (request, response) => {
    console.log("got here\n");
    User.findOne({ username: request.session.username }).then(users => {
        response.json(users)
    })
})

app.get('/posts', (request, response) => {
    console.log("got here\n");
    Post.find({}).then(post => {
        response.json(post)
    })
})


app.post('/add', (request, response) => {
    console.log("in index\n");
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
    console.log("in register\n");
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

    
    console.log("in login\n");
    const body = request.body

    
    const user = User.findOne({ username: body.username }).then(user => {

    if (user.password === body.password) {
        var name = user.username
        //const sessUser = { username: user.username,  password: user.password};


        console.log("login successful")
        //console.log("cookie: " + request.session.username);
        request.session.username = body.username;
        request.session.userid = user._id;

        console.log(request.session.username, request.session.userid);
    }
    else {
        console.log("login failed");
    }
    request.session.username = body.username
    request.session.userid = user._id
    
    return response.send(request.session.username)
    
    })
  
    
})

app.get('/setReq', (request, response) => {
    request.session.username = "name"

    return response.send(request.session.username)
})

app.get('/getReq', (request, response) => {


    
    var name = request.session.username
    console.log('yo ' + request.session.username + ' ' + request.session.userid)
    console.log('cookie guy: ', name, request.session.userid)
    return response.send(name)
    
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
app.post('/sendLocation', (request, response) => {
    console.log(request.lng);
    //locallat = request.lat, locallng = request.lng;
    //console.log(request.lat, request.lng)

})

app.get('/fillFeed', (request, response) => {

})

app.post("/upload_files", upload.array("files"), uploadFiles);

function uploadFiles(req, res) {
    //request.session.username = "a@a";
    console.log('reached upload files')
    User.findOne({ username: request.session.username }).then(users => {
        const post = new Post({
            pictures: req.files[0].filename,
            description: req.body.textarea,
            owner: users._id,
            volunteers: [users._id],
            location: { "lat": req.body.lat, "lng": req.body.lng }
        })
        post.save();
        
        
    })

    const chat = new Chat({
        iden:0,
        users: [request.session.userid],
        messages: []
    });
    chat.save();
    console.log(req.body);
    console.log(req.files[0]);
    res.json({ message: "Successfully uploaded files" });
}

app.get('/getPopulate', (request, response) => {
    Post.find().then(posts => {
        response.json(posts)
    })
})

app.get('/populate', (request, response) => {
    console.log("got here\n");

    User.findOne({ username: request.session.username }).then(users => {
        const post = new Post({
            pictures: "pic",
            owner: users._id,
            volunteers: [users._id],
            description: 'description',
            location: { lat: 0, lng: 0 }
        })
        post.save();
    })
    response.send('<h1>Hello World!</h1>')
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
    response.json({"username": request.session.username});
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
        iden:0,
        users: [request.session.userid],
        messages: [{sent: request.session.userid, message: "hello"}]
    });
    chat.save();

    Chat.updateOne(
        {iden:0},
        {$push: {messages: {sent: request.session.userid, message: "hey"}}}
    )
        response.send('<h1>Hello World!</h1>')

})

app.get('/getCookies', (request, response) => {
    User.findOne({ username: request.session.username }).then(users => {
        request.session.username = users.username,
        request.session.userid = users._id
    })
    response.send('<h1>Hello World!</h1>')

})


app.get('/updateChat', (request, response) => {
const obj = {message: "from chat"}
Chat.updateOne(

        {iden:0},
        {$push: {messages: obj}},function(err,doc) {
                    if(err){
                        console.log(err);
                    }
                    console.log('updated')        
                } 
    )
        response.send('<h1>Hello World!</h1>')

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

app.get('/getUserPosts', (request, response) => {
    
    User.findOne({username:request.session.username}).then(user => {
        
            Post.findOne({_id:user.owner}).then(post => {
                data = []
                data.push(post)
                response.json(data)
            })
    })

})

app.get('/getUserVolunteered', (request, response) => {
    
    User.findOne({username:request.session.username}).then(user => {
        
        console.log(user)
            Post.findOne({_id:user.volunteering[0]}).then(post => {
                console.log(post)
                data = []
                data.push(post)
                response.json(data)
            })
    })

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
    //response.json(data)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

