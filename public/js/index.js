// CLIENT SIDE
var socket = io() // we need socket to listen to data from the server, and to send data to the server. this socket variable is IMPORTANT!
socket.on('connect', function () {
  console.log('connected to server')
})

socket.on('newMessage', function (message) {
  console.log('new message', message)
  // use jquery to create element
  var li = $('<li></li>')
  li.text(`${message.from}: ${message.text}`)

  $('#messageS').append(li)
})

socket.on('newLocationMessage', function (message) {
  var li = $('<li></li>')
  // set target of link to blank to open up location in a new tab
  var a = $('<a target="_blank">My location</a>')
  li.text(`${message.from}`)
  a.attr(`href`, message.url)
  li.append(a)
  $('#messageS').append(li)
})

socket.on('disconnect', function () {
  console.log('disconnected from server')
})

// socket.emit('createMessage', {
//   from: 'Frank',
//   text: 'Got it'
// }, function (data) {
//   console.log(`got it ${data}`)
// })

$('#message-form').on('submit', function (e) {
  e.preventDefault()
  socket.emit('createMessage', {
    from: 'User',
    text: $('#message-input').val()
  }, function () {

  })
})

var locationButton = $('#send-location-button')
locationButton.on('click', function () {
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by your browser.')
  }

  navigator.geolocation.getCurrentPosition(function (position) {
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    })
  }, function () {
    alert('Unable to fetch location.')
  })
})
