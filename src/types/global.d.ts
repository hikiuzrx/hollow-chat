import { ValidationException,UnauthorizedException,ConflictException,NotFoundException } from "../config/exceptions";
declare global {
    let ValidationException:typeof ValidationException
    let NotFoundException:typeof NotFoundException
    let ConflictException:typeof ConflictException
    let UnauthorizedException:typeof UnauthorizedException
}