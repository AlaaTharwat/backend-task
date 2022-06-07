import { NextFunction, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import AuthenticationTokenMissingException from '../exceptions/AuthenticationTokenMissingException';
import NotAuthorizedException from '../exceptions/NotAuthorizedException';
import WrongAuthenticationTokenException from '../exceptions/WrongAuthenticationTokenException';
import DataStoredInToken from '../interfaces/dataStoredInToken';
import RequestWithUser from '../interfaces/requestWithUser.interface';
import userModel from '../user/user.model';

async function hasAdminPermission(request: RequestWithUser, response: Response, next: NextFunction) {
  
    const role = request.role; 
    const user = request.user;
    if (role === 'globalManager' || role === 'manager') {   
        return next();
    }

    const hasAccessOwn = user.role.findIndex((role) => {
        return role.role === 'regular' && user._id?.toString() === request.query?.id?.toString();
    })

    if(hasAccessOwn > -1)  return next();
    return next(new NotAuthorizedException())
}



export default hasAdminPermission;
