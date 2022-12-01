const mongoose = require('mongoose'), Schema = mongoose.Schema

const url = process.env.DB_URI;

console.log('connecting to', url)
mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const post = new mongoose.Schema({
  pictures: String,
  description: String,
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
  volunteers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  location: { lat: Number, lng: Number },
  chatbox: { type: Schema.Types.ObjectId, ref: 'Chat' }
})

post.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Post', post)
