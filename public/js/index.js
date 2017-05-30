// CLIENT SIDE
var socket = io() // we need socket to listen to data from the server, and to send data to the server. this socket variable is IMPORTANT!
socket.on('connect', function () {
  console.log('connected to server')
})

socket.on('newMessage', function (data) {
  console.log('new email', data)
})

socket.on('disconnect', function () {
  console.log('disconnected from server')
})
