import { Container } from 'typedi'
import * as bcrypt from 'bcrypt';
import { Request, Response, NextFunction, Router } from 'express';
import * as jwt from 'jsonwebtoken';
import WrongCredentialsException from '../exceptions/WrongCredentialsException';
import Controller from '../interfaces/controller.interface';
import DataStoredInToken from '../interfaces/dataStoredInToken';
import TokenData from '../interfaces/tokenData.interface';
import validationMiddleware from '../middlewares/validation.middleware';
import hasResourcePermissionsMiddleware from '../middlewares/hasResourceAction.middleware';
import authMiddleware from '../middlewares/auth.middleware';
import CreateUserDto from '../user/user.dto';
import User from '../user/user.interface';
import userModel from './../user/user.model';
import AuthenticationService from './authentication.service';
import LogInDto from './logIn.dto';

const authenticationService = Container.get(AuthenticationService);

class AuthenticationController implements Controller {
  public path = '/auth';
  public router = Router();


  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/adduser`, validationMiddleware(CreateUserDto), authMiddleware,   
     hasResourcePermissionsMiddleware("user", "create") 
    ,this.registration);
    this.router.post(`${this.path}/login`, validationMiddleware(LogInDto), this.loggingIn);
    this.router.post(`${this.path}/logout`, this.loggingOut);
  }

  private registration = async (request: Request, response: Response, next: NextFunction) => {
    const userData: CreateUserDto = request.body;
    try {
      const {
        cookie,
        user,
      } = await authenticationService.register(userData);
      response.setHeader('Set-Cookie', [cookie]);
      user.password = undefined;
      return response.status(201).json({
        user,
        success: true,
        messages: "Success",
      });
    } catch (error) {
     return next(error);
    }
  }

  private loggingIn = async (request: Request, response: Response, next: NextFunction) => {
    const logInData: LogInDto = request.body;
    try {
      const user = await authenticationService.getAuthenticatedUser(logInData.email, logInData.password);
      console.log(user)
      response.setHeader('Set-Cookie', [this.createCookie(user.tokenData)]);
      user.password = undefined;
      return response.status(200).json({
        user,
        success: true,
        messages: "Success",
      });
    } catch (e) {
      next(e);
    }

  }

  private loggingOut = (request: Request, response: Response) => {
    response.setHeader('Set-Cookie', ['Authorization=;Max-age=0']);
    response.send(200);
  }

  private createCookie(tokenData: TokenData) {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn}`;
  }

}

export default AuthenticationController;
