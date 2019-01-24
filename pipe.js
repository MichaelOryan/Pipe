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
}
