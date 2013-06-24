
var Queue = require('fastqueue')
var Emitter = require('emitter')

module.exports = unhandled

/**
 * mixin Emitter
 */

Emitter(unhandled)

/**
 * add an error. if you don't pass an error
 * an Array of all errors will be returned
 *
 * emits:
 *   - add
 *   - forget
 * 
 * @param {Error} error
 */

function unhandled(error){
	if (!error) return errors.toJSON()
	errors.push(error)
	unhandled.emit('add', error)
	if (errors.length > unhandled.windowSize) {
		unhandled.emit('forget', errors.shift())
	}
}

/**
 * max number of errors to store
 * @type {Number}
 */

unhandled.windowSize = 20

/**
 * error storage mechanism
 * @type {Queue}
 * @api private
 */

var errors = unhandled.errors = new Queue

/**
 * remove `value` from the window. Returns `true`
 * if `value` was in the window
 *   
 * emits:
 *   - remove
 * 
 * @param {Error} value
 * @return {Boolean}
 */

unhandled.remove = function(value){
	if (errors.remove(value)) {
		unhandled.emit('remove', value)
		return true
	}
	return false
}