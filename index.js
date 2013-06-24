
var global = function(){ return this }()
  , runtime = require('runtime-context')

if (runtime == 'production') {
	// dummy module
	exports = module.exports = function(e){
		if (!e) return []
	}
	exports.on =
	exports.off =
	exports.emit =
	exports.remove = function(){}
} else {
	exports = module.exports = require('./unhandled')
	if (!global.unhandled) global.unhandled = exports
	else global.unhandled['0.1.0'] = exports
}

/**
 * add some basic logging
 */

if (runtime == 'debug') {
	exports.on('add', function(error){
		var timer = setTimeout(function(){
			console.error('[registered as unhandled for 500ms]', error.stack)
			cleanUp()
		}, 500)
		exports.on('remove', onRemove)
		exports.on('forget', onForget)
		function onRemove(e){
			if (e === error) {
				clearTimeout(timer)
				cleanUp()
			}
		}
		function onForget(e){
			if (e === error) cleanUp
		}
		function cleanUp(){
			exports.off('remove', onRemove)
			exports.off('forget', onForget)
		}
	})
}