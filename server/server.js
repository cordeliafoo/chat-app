// SERVER SIDE
const path = require('path')
const express = require('express')
const http = require('http')
const SocketIO = require('socket.io')

const publicPath = path.join(__dirname, '../public')
const port = process.env.PORT || 3000

const {generateMessage, generateLocationMessage} = require('./utils/message')

var app = express()
var server = http.createServer(app)

// configure server to use socket.io
// io is now the websocket server
var io = SocketIO(server)

app.use(express.static(publicPath))

io.on('connection', function (socket) {
  console.log('new user connected')

  // socket.emit emits event from server to single connection
  socket.emit('newMessage', generateMessage('Admin', 'Welcome to Chat App'))

  // broadcasting means emitting an event from server to everyone but one user
  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New User Joined'))
  // socket.broadcast.emit('newMessage', {
  //   from: message.from,
  //   text: message.text,
  //   createdAt: new Date().getTime()
  // })

  socket.on('createMessage', (message, callback) => {
    console.log(`created message is ${message}`)
    // io.emit emits event from server to every single connection
    io.emit('newMessage', generateMessage(message.from, message.text))
    callback(`This is an acknowledgement from the server`)
  })

  socket.on('createLocationMessage', (coords) => {
    io.emit('newLocationMessage', generateLocationMessage(`Admin`, coords.latitude, coordes.longitude))
  })

  socket.on('disconnect', function () {
    console.log('user was disconnected')
  })
})

server.listen(port, () => {
  console.log(`server is up on ${port}`)
})
