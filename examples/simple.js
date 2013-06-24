/**
 * Note: this would all be happening inside some async framework
 */

var unhandled = require('..')
module.exports = unhandled

var error1 = new Error('some error')
var error2 = new Error('some other error')
// I just caught a few errors you havn't registered a handler
// but that could of been by mistake. I'll put them here for 
// now in case it was.
unhandled(error1)
unhandled(error2)

// oh your user decided to handle one of them after all
unhandled.remove(error1) // => true

// a little while later your user is wondering why their
// thing isn't working so they send the process SIGUSR2 
// to log the unhandled errors. 
// 
// not implemented
// 
// setTimeout(function(){
// 	process.emit('SIGUSR2')
// 	// => "some other error"
// }, 1000)

setTimeout(function(){
	// prevent process exiting
}, 1000)