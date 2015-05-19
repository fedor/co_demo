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
	 - Safe FOR SINGLE CHAIN
	 - Centralized Errors Handling FOR SINGLE CHAIN
	 - LESS Callback Hell
	CONS:
	 - mini-Callback Hell
	 - No centralized Errors Handling BETWEEN CHAINS
	 - 2 ways to report errors (callback and throw);

	Notice:
	 - Execution chain.
	 - TODO: remove error handling. What would happen?

4. Generators.

	Just a showcase how to call generators. Not actually an example.
	Generators themself are not about flow-control or errors-handling.
	
	Notice: .next()

5. CO + Generators.

	Transitional showcase. Not actually an example.
	
	Notice:
	 - co takes control over yield
	 - co calls next()
	 - next().value --> yield
	 - yield --> return
	 - 2 ways to catch errors (Promise().catch(e) & try-catch)
	 - TODO: put debug printing to co..toPromise() and co..next(). What would happen?

6. CO + Promises.

	CO allows to "yield" on Promises, get result or Error "throw".

	PROS:
	 - Async
	 - Safe
	 - Centralized Errors Handling
	 - No callback hell while uses co(function *(){...})
	CONS:
	 - Manually implemented Promises contains all CONS of Promises solution.

7. CO + Bluebird.

	Bluebird reimplemented Promises + add additional functionality, like promisification.
	Promisification: callback-async-function --> promise-return-function

	PROS:
	 - Same
	 - Single way to report error across the code.
	 - No Promise-CONS in own code

--------

Suggestions:

 - Promifify functions with callbacks, use bb.promisify() && bb.promisifyAll().

 - Use co(function* () {...}) for flow-control.
 
 - Provide/Return Promise interface, not traditional-callbacks.
 
 - Create Promise thru co:
   - "return co(function* () {...});"
   - NOT "return new Promise(function(resolve, reject) {...})";
   - Less potential problems.
   - Cleaner code.
   - Centralized error handling.

--------

BONUS: async.each() example in co_async_each.js