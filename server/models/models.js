const mongoose = require('mongoose')

const url = 'mongodb+srv://mern:4ObKL7zc3NtkatjD@cluster0.9nayn3d.mongodb.net/?retryWrites=true&w=majority'

console.log('connecting to', url)
mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const user = new mongoose.Schema({
    username: String,
    password: String,
})

const message = new mongoose.Schema({
    //user: { type: Schema.Types.ObjectId, ref: 'User' }
    name: String
    message: String,
})

user.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

message.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})


module.exports = mongoose.model('User', user)
module.exports = mongoose.model('Message', message)
