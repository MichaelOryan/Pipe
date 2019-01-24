# Pipe v0.1a
A synchronous promise

Still working out the details but at the moment as of the first commit of code this is the idea.

Start with new Pipe()

Start with a value with new Pipe(value)

Result of the pipe called will pass to the next pipe. Eg; then, all, catch, result

Pretty much like a promise.

.then(f)

.catch(err)

err is a function that can accept two parameters. error and result (error, result)

Result is the last successfully returned result from the pipe

err function can return a value or the last successfully returned result will be passed after the catch

.then(() => 1)
.catch(console.error)
.result() // returns 1

catch is skipped if there was no error thrown

can have multiple catches in the chain

.all(arrayOfPipes)

exectutes all pipes and their return results are now the results sent to the next in the chain

.all([1, 2, 3, 4, 5].map(doublePipe))
.result()

returns [2, 4, 6, 8, 10]


.result()

returns the result returned from the last item in the pipe. Terminates the pipe.
