//require("dotenv").config({ path: "../config.env" });
const mongoose = require('mongoose'), Schema = mongoose.Schema

const user = new mongoose.Schema({
    username: String,
    password: String,
    volunteering: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
    uploaded: [{ type: Schema.Types.ObjectId, ref: 'Post' }]
})

user.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('User', user)
