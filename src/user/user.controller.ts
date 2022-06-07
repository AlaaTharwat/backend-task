import { Container } from 'typedi'
import { Router, Request, Response, NextFunction } from 'express';
import Controller from '../interfaces/controller.interface';
import UserService from './user.service';
import authMiddleware from '../middlewares/auth.middleware';
import hasResourcePermissionsMiddleware from '../middlewares/hasResourceAction.middleware';
import UserNotFoundException from '../exceptions/UserNotFoundException';
import hasAdminPermission from '../middlewares/admin.middleware';
import CreateUserDto from './user.dto';
import User from './user.interface';
import HttpException from '../exceptions/HttpException';

const userService = Container.get(UserService);

class UserController implements Controller {
  public path = '/users';
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/all`, authMiddleware,
      hasResourcePermissionsMiddleware("user", "read"), hasAdminPermission
      , this.getAllUsers);


    this.router.get(`${this.path}`, authMiddleware,
      hasResourcePermissionsMiddleware("user", "read"), hasAdminPermission
      , this.getUserById);

    this.router.delete(`${this.path}`, authMiddleware,
      hasResourcePermissionsMiddleware("user", "delete"), hasAdminPermission
      , this.deleteUser);

    this.router.put(`${this.path}`, authMiddleware,
      hasResourcePermissionsMiddleware("user", "update"), hasAdminPermission
      , this.updateUser);
  }

  private getAllUsers = async (request: Request, response: Response, next: NextFunction) => {

    try {
      const userQuery = userService.getAllUsers(request.query.groupid?.toString());
      const users = await userQuery;
      if (users) {
        return response.status(200).json({
          users,
          success: true,
          messages: "Success",
        });
      } else {
        next(new UserNotFoundException(""))
      }
    } catch (e) { next(e) }

  }

  private getUserById = async (request: Request, response: Response, next: NextFunction) => {

    try {
      const id = request.query.id;
      if(!id) return next(new HttpException(400, "Please send Id"))
      const userQuery = userService.findUserById(id?.toString())
      const user = await userQuery;
      if (user) {
        return response.status(200).json({
          user,
          success: true,
          messages: "Success",
        });
      } else {
        next(new UserNotFoundException(id.toString()));
      }
    } catch (e) {
      next(e)
    }

  }

  private deleteUser = async (request: Request, response: Response, next: NextFunction) => {
    const id = request.query.id;
    const groupId = request.query.groupid;
    if(!id) return next(new HttpException(400, "Please send Id"))

    try {
      let user = await userService.deleteUser(id.toString());

      return response.status(200).json({
        user,
        success: true,
        messages: "Success",
      });
    } catch (e) {
      next(e)
    }

  }

  private updateUser = async (request: Request, response: Response, next: NextFunction) => {

    try {
      const id = request.query.id;
      const user: CreateUserDto = request.body;
      if(!id) return next(new HttpException(400, "Please send Id"))

      let updatedUser = await userService.updateUser(user, id?.toString());

      return response.status(200).json({
        updatedUser,
        success: true,
        messages: "Success",
      });
    } catch (e) {
      next(e)
    }
  }
}

export default UserController;
