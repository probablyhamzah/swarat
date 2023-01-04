const mongoose = require('mongoose'), Schema = mongoose.Schema


const chat = new mongoose.Schema({
    iden: Number,
    users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    messages: [{
        sent: { type: Schema.Types.ObjectId, ref: 'User' },
        message: String
    }]
    
})

chat.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Chat', chat)
