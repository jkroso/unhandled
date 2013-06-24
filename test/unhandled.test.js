
var unhandled = require('../unhandled')
var chai = require('./chai')

var errors = [
	new Error('one'),
	new Error('two'),
	new Error('three'),
]

var spy
beforeEach(function(){
	unhandled.off('add', spy)
	unhandled.off('forget', spy)
	unhandled.off('remove', spy)
	spy = chai.spy()
	errors.forEach(function(err){
		unhandled.remove(err)
	})
})

describe('unhandled', function(){
	it('should store errors', function(){
		errors.forEach(unhandled)
		unhandled().should.eql(errors)
	})

	it('should emit an "add" event', function(){
		unhandled.on('add', spy)
		unhandled(errors[0])
		spy.should.have.been.called.with.exactly(errors[0])
	})

	it('should forget stuff once the window is full', function(){
		unhandled.windowSize = 1
		unhandled.on('forget', spy)
		unhandled(errors[0])
		unhandled(errors[1])
		unhandled(errors[2])
		unhandled().should.eql([errors[2]])
		spy.should.have.been.called.with(errors[0])
		spy.should.have.been.called.with(errors[1])
		spy.should.have.been.called.twice
	})
})
