import { BaseException, NotFoundException, ValidationException, UnauthorizedException, ConflictException } from './config/exceptions';

declare global {
  var BaseException: typeof BaseException;
  var NotFoundException: typeof NotFoundException;
  var ValidationException: typeof ValidationException;
  var UnauthorizedException: typeof UnauthorizedException;
  var ConflictException: typeof ConflictException;
  var InternalServerException: typeof InternalServerException
}