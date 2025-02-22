class BaseException extends Error {
    public statusCode: number;
    public resource: string;
  
    
    constructor(message: string, resource: string, statusCode: number) {
      super(message);
      this.resource = resource;
      this.statusCode = statusCode;
      Error.captureStackTrace(this, this.constructor);
    }
  }

class ConflictException extends BaseException {
    constructor(message: string, resource: string) {
      super(message, resource, 409); 
    }
  }
  
  
  class NotFoundException extends BaseException {
    constructor(message: string, resource: string) {
      super(message, resource, 404);
    }
  }
  
  
  class UnauthorizedException extends BaseException {
    constructor(message: string, resource: string) {
      super(message, resource, 401); 
    }
  }
  

  class ValidationException extends BaseException {
    constructor(message: string, resource: string) {
      super(message, resource, 400); 
    }
  }
class InternalServerException extends BaseException {
    constructor(resource: string) {
        super("internal Server Exception", resource, 500);
    }
}
global.InternalServerException = InternalServerException;
global.BaseException = BaseException;
global.NotFoundException = NotFoundException;
global.ValidationException = ValidationException;
global.UnauthorizedException = UnauthorizedException;
global.ConflictException = ConflictException;

export { BaseException, NotFoundException, ValidationException, UnauthorizedException, ConflictException }