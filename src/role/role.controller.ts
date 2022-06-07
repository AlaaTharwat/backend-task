import { Container } from 'typedi'
import { Router, Request, Response, NextFunction } from 'express';
import Controller from '../interfaces/controller.interface';
import RoleService from './role.service';
import authMiddleware from '../middlewares/auth.middleware';
import validationMiddleware from '../middlewares/validation.middleware';
import hasResourcePermissionsMiddleware from '../middlewares/hasResourceAction.middleware';

import CreateRoleDto from './role.dto'

const roleService = Container.get(RoleService);

class RoleController implements Controller {
  public path = '/roles';
  public router = Router();
  // public roleService = new RoleService();


  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/test`, this.test)
    this.router.post(`${this.path}/add`, validationMiddleware(CreateRoleDto), authMiddleware, 
    hasResourcePermissionsMiddleware("role", "create") 
    ,this.createRole);
    // this.router.get(`${this.path}/:id`, authMiddleware, this.getUserById);
  }

  private createRole = async (request: Request, response: Response, next: NextFunction) => {
    const roleData: CreateRoleDto = request.body;
    try {
      const {
        role
      } = await roleService.createRole(roleData);
      console.log(role)
      return response.status(200).json({
        ...roleData,
        success: true,
        messages: "Success",
      });
    } catch (error) {
      next(error);
    }
  }

  private test = async (request: Request, response: Response, next: NextFunction) => {
    response.send("Luka-Modric-10");
  }

}

export default RoleController;
