if any questions, please mail to mail@fedor.cc
Please install Node.js v4 or above from nodejs.org

How to avoid callback hell

	> git clone http://github.com/fedor/co_demo
	> cd co_demo
	> npm install

Data and execution flow in the examples:
 - input -->
       (a)sync1() -->
           delay(2000) -->
               (a)sync2() -->
                   (a)sync3() -->
                       output

1. Sync version.
	
	PROS:
	 - Safe
	 - Readable: no Callback Hell
	 - Centralized error handling
	CONS:
	 - Sync

2. Async.
	
	PROS:
	 - Async
	CONS:
	 - Unsafe: no guarantee to catch "throw new Error()"
	 - No centralized errors handling
	 - Callback hell

3. Promises.

	"The Promise object is used for asynchronous computations.
	A Promise represents a value which may be available now, or in the future, or never."
	— https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise

	PROS:
	 - Async
	 - Centralized error handling
	 - Less callback hell
	CONS:
	 - mini-Callback Hell
	 - 2 ways to report errors (callback and throw)
	TODO:
	 - Remove error handling. What would happen?

4. Generators.

	"Generators are functions which can be exited and later re-entered.
	Their context (variable bindings) will be saved across re-entrances."
	— https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Statements/function*

	This is a showcase of generators. Not actually an example.
	
	NOTE:
	 - "function*" defines "generator function" a function you can re-enter
	 - Generator function returns "generator", an object to control its execution
	 - .next().value
	 - yield cause value return from generator function

5. Promises + Generators #1

	Try to use generator to resolve Promises without callbacks
	
	NOTE:
	 - main()
	 - runner()

6. Promises + Generators #2

	Add correct error handling (rejected Promises)

	NOTE:
	 - .throw() will actually return result, similar to .next()

7. Promises + Generators #3

	Allow runner to accept generator function, not generator

	NOTE:
	 - runner(main()) --> run(main)

8. Promises + Generators: result

	Turn runner into a Promise fabric.
	All custom async functions implemented with runner

	PROS:
	 - Async
	 - Safe
	 - Centralized Errors Handling
	 - No callback hell while uses run(function *(){...})
	 - Single way to report error across the code.
	NOTE:
	 - async2() error report was simplified with runner
	 - delay() still require manual promisification

9. co and bluebird

	co is a popular "runner" from TJ. It can "yield" Promises,
	Promises inside arrays or objects, generators, etc.

	bluebird provides logic for promisification.
	Promisification: callback-function --> promise-return-function

--------

Suggestions:

 - Promisify functions with callbacks, use bluebird.promisify() && bluebird.promisifyAll().
 - Use co and for flow-control.
 - Avoid callback-based handlers for async code e.g. use for-loop, not .forEach()
 - Return Promise from async functions, not traditional-callbacks.
 - Create Promise-based functions via co
 - Only use "return new Promise(function(resolve, reject) {...})" to manually promisify interfaces

--------

BONUS: async.each() example in co_async_each.js
