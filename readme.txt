Before we start:
	> git clone http://github.com/fedor/co_demo
	> cd co_demo
	> npm install

Data and execution flow in the examples:
 - input --> (a)sync1() --> delay(2000) --> (a)sync2() --> (a)sync3() --> output

1. Sync version.
	
	PROS:
	 - Safe
	 - Readable: no Callback Hell
	 - Centralized Errors Handling
	CONS:
	 - Sync

2. Async.
	
	PROS:
	 - Async
	CONS:
	 - Unsafe: no guarantee to catch "throw Error()"
	 - No centralized Errors Handling
	 - Callback Hell

3. Promises.

	PROS:
	 - Async
	 - Centralized Errors Handling
	 - LESS Callback Hell
	CONS:
	 - mini-Callback Hell
	 - 2 ways to report errors (callback and throw);
	TODO:
	 - Remove error handling. What would happen?

4. Generators.

	Just a showcase how to call generators. Not actually an example.
	
	Notice:
	 - "function*" defines "generator function" a function you can re-enter
	 - Generator function returns "generator" an object to control its execution
	 - .next().value
	 - yield cause value return from generator function

5. Promises + Generators #1

	Try to use generator for control flow of async Promise-based functions
	
	Notice:
	 - main()
	 - runner()

6. Promises + Generators #2

	Add correct error handling. Changes are commented.

	Notice:
	 - .throw() will actually return result, similar to .next()

7. Promises + Generators #3

	Allow runner to accept generator function, not generator

	Notice:
	 - runner(main()) --> run(main)

8. Promises + Generators #4

	Turn runner into a Promise fabric. Changes are commented.

	Notice:
	 - how async2() was simplified with runner

9. Promises + Generators: result

	All custom async functions implemented with runner

	Notice:
	 - delay() still require manual promisification

	PROS:
	 - Async
	 - Safe
	 - Centralized Errors Handling
	 - No callback hell while uses run(function *(){...})
	 - Single way to report error across the code.
	 - No Promise-CONS in own code

10. co and bluebird

	co is a popular "runner" from TJ. It can handle Promises,
	Promises inside arrays or objects, generators, etc.

	bluebird reimplements Promises + add additional functionality, like promisification.
	Promisification: callback-async-function --> promise-return-function

--------

Suggestions:

 - Promisify functions with callbacks, use bb.promisify() && bb.promisifyAll().

 - Use co(function* () {...}) for flow-control.

 - Avoid function-based handlers e.g. use for-loop, not .forEach()
 
 - Provide/Return Promise interface, not traditional-callbacks.

 - Create Promise via co:
   - "return co(function* () {...});"
   - NOT "return new Promise(function(resolve, reject) {...})";
   - Less potential problems.
   - Cleaner code.
   - Centralized error handling.

--------

BONUS: async.each() example in co_async_each.js
