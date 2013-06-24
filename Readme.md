
# unhandled

  a window into your programs ignorance. when you write asynchronous and concurrent programs it is sometimes desirable to ignore errors, other times you just forget to add an error handlers. Either way its interesting to see which errors your program is choosing not to handle. This module provides a moving window into the most recent set of unhandled errors in your application. Note: you shouldn't actually be telling this module about any errors thats a job for your control flow tools. Low level tools put errors in this thing so you have the _option_ to look at them.

  If you use tools like [co](//github.com/visionmedia/co) with fork joins you would find this modules output especially interesting because the errors you don't handle (and the ones you do) could easily be different between runs due to normal variations in IO timing. co along with most other control flow tools don't provide access to unhandled errors though.

## Installation

_With [component](//github.com/component/component), [packin](//github.com/jkroso/packin) or [npm](//github.com/isaacs/npm)_  

	$ {package mananger} install jkroso/unhandled

then in your app:

```js
var unhandled = require('unhandled')
```

## API

  - [unhandled()](#unhandled)
  - [unhandled.windowSize](#unhandledwindowsize)
  - [unhandled.remove()](#unhandledremovevalueerror)

## unhandled(value:Error)

  add an error. if you don't pass an error it will behave as a getter for the current window of errors.

  emits:  

 + add
 + forget

## unhandled.windowSize

  The max number of errors to store. Any more added after that will cause older errors to be forgotten. The default size is 20.

## unhandled.remove(value:Error)

  remove `value` from the window. Returns `true` if `value` was in the window

  emits:

 + remove

## Running the tests

Just run `make`. It will install and start a development server leaving the tests waiting for you [at](http://localhost:3000/test)
