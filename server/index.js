const express = require('express')
const app = express()
const cors = require('cors')

const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const router = express.Router();
const morgan = require("morgan");
const mongoose = require("mongoose");
const path = require("path");
const helmet = require('helmet');

//require('dotenv').config()

require("dotenv").config({ path: "./config.env" });

const User = require('./models/user')

app.use(express.json())
app.use(cors())
app.use(express.static('build'))

//mongoose
//  .connect('mongodb+srv://mern:4ObKL7zc3NtkatjD@cluster0.9nayn3d.mongodb.net/?retryWrites=true&w=majority', {
//    useNewUrlParser: true,
//    useCreateIndex: true
//  })
//  .then(() => console.log("MongoDB connected..."))
//  .catch((err) => console.log(err));

const mongoDBstore = new MongoDBStore({
  uri: process.env.DB_URI,
  collection: "mySessions"
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(morgan("dev"));

app.use(
  session({
    name: "cookie", 
    secret: "secret",
    resave: true,
    saveUninitialized: false,
    store: mongoDBstore,
    cookie: {
      maxAge: 1000 * 60 * 60 * 3,
      sameSite: false,
      secure: false
    }
  })
);

app.use(helmet())








app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
})

app.get('/users', (request, response) => {
    console.log("got here\n");
    User.findOne({username: "a@a"}).then(users => {
        response.json(users)
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
    })

    const sessUser = { username: user.username,  password: user.password};
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

    User.findOne({username: body.username}).then(user => {
        if (user.password === body.password)
        {
            const sessUser = { username: user.username,  password: user.password};
            request.session.user = sessUser;
            console.log("login successful");
        }
        else
        {
            console.log("login failed");
        }
        response.json(user);

    })

})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

