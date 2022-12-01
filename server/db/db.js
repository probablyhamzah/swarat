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

//const mongoose = require('mongoose')

const url = 'mongodb+srv://mern:4ObKL7zc3NtkatjD@cluster0.9nayn3d.mongodb.net/?retryWrites=true&w=majority'

console.log('connecting to', url)
mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const mongoDBstore = new MongoDBStore({
  uri: url,
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


