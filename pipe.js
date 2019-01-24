function Pipe (value) {
  this._result = value;
  this._errorState = false;
  this._error = undefined;

  this.then = f => {
    if(!this._errorState) {
      try {
        this._result = f(this._result)
      } catch(error) {
        this._errorState = true;
        this._error = error;
      }
    }
    return this;
  }
  
  this.catch = f => {
  	if(this._errorState) {
    	this._errorState = false;
      try {
      	this._result = f(this._error, this._result) || this._result;
      } catch (error) {
      	this._errorState = true;
        this._error = error;
      }
    }
    return this;
  }
  
  this.result = () => this._result;
  
  this.all = pipes => {
  	if(!this._errorState) {
    	try {
        this._result = pipes.map(pipe => pipe.result());
      } catch (error) {
      	this._errorState = true;
        this._error = error;      
      }
    }
    return this;
  }
  
  // Untested. It's late.
  // Pass in a bunch of pipes
  // Apply them all to the result
  // result is a bunch of pipes
  this.fork = pipes => {
  	if(!this._errorState) {
    	try {
        this._result = pipes.map(pipe => pipe(this._result));
      } catch (error) {
      	this._errorState = true;
        this._error = error;      
      }
    }
    return this;  
  }
  
  // Take some pipes and turn them back into not pipes
  // I dunno I'm sleepy. It seems like something fun that might have some use.
  // Need to test
  
  this.merge = pipes => {
  	if(!this._errorState) {
    	try {
        this._result = pipes.map(pipe => pipe(this._result.result()));
      } catch (error) {
      	this._errorState = true;
        this._error = error;      
      }
    }
    return this;    
  }
}
