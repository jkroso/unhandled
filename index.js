
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
	else global.unhandled['0.1.1'] = exports
}

/**
 * add some basic logging
 */

if (runtime == 'debug') {
	exports.on('add', function(error){
		var timer = setTimeout(function(){
			console.error('[unhandled] %s', error.stack)
			cleanUp()
		}, 500)
		exports.on('remove', onRemove)
		exports.on('forget', onForget)
		function onRemove(e){
			if (e === error) {
				console.error('[handled] %s', e.message)
				clearTimeout(timer)
				cleanUp()
			}
		}
		function onForget(e){
			if (e === error) cleanUp()
		}
		function cleanUp(){
			exports.off('remove', onRemove)
			exports.off('forget', onForget)
		}
	})
}