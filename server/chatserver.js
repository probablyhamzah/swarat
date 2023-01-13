const express = require('express');
const { Socket } = require('socket.io');
const app = express()
const http = require('http').createServer(app);
const PORT = process.env.PORT || 4000
const cors = require('cors');
http.listen(PORT, () =>{
    console.log(`Listening on port : ${PORT}`)
}
)
app.use(cors({
  origin : 'http://localhost:3000',
  credentials: true,
}));
app.get('/api',(req, res) => {
    res.json({
         message: 'Hello world',
     });
});

//Socket

const io = require("socket.io")(http,  {
    cors: {
        origin: "http://localhost:3000"
    }
});

io.on('connection', (socket) => {
    socket.on('message', (msg) => {
        socket.broadcast.emit('message1', msg)
        console.log(msg)
    })
})
