// SERVER SIDE
const path = require('path')
const express = require('express')
const http = require('http')
const SocketIO = require('socket.io')

const publicPath = path.join(__dirname, '../public')
const port = process.env.PORT || 3000

var app = express()
var server = http.createServer(app)

// configure server to use socket.io
// io is now the websocket server
var io = SocketIO(server)

app.use(express.static(publicPath))

io.on('connection', function (socket) {
  console.log('new user connected')


  socket.on('createMessage', (message) => {
    console.log(`created message is ${message}`)
    // socket.emit emits event to single connection
    // io.emit emits event to every single connection
    io.emit('newMessage', {
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime()
    })

  })

  socket.on('disconnect', function () {
    console.log('user was disconnected')
  })
})

server.listen(port, () => {
  console.log(`server is up on ${port}`)
})
