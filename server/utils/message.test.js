// testing to ensures object got back from message.js is what we expect
var expect = require('expect')
var {generateMessage, generateLocationMessage} = require('./message')

describe(('generateMessage'), () => {
  it('should generate the correct message object', () => {
    // store res in variable
    var from = 'Jen'
    var text = 'this is Jen\'s message'
    var message = generateMessage(from, text)

    expect(message.createdAt).toBeA('number')
    expect(message).toInclude({
      from,
      text
    })
    // assert the from match
    // assert the text match
    // assert createdAt is number
  })
})

describe(('generateLocationMessage'), () => {
  it('should generate location'), () => {
    var from = 'Andy'
    var latitude = 1
    var longitude = 1
    var url = 'http://www.google.com/maps?q=1,1'
    var message = generateLocationMessage(from, latitude, longitude)

    expect(message.createdAt).toBeA('number')
    expect(message).toInclude({from, url})
  }
})
