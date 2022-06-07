import { Container } from 'typedi'
import { Router, Request, Response, NextFunction } from 'express';
import Controller from '../interfaces/controller.interface';
import validationMiddleware from '../middlewares/validation.middleware';
import CreateGroupDto from './group.dto'
import GroupService from './group.service';
import authMiddleware from '../middlewares/auth.middleware';
import hasResourcePermissionsMiddleware from '../middlewares/hasResourceAction.middleware';
import GroupNotFoundException from '../exceptions/GroupNotFoundException';
import HttpException from '../exceptions/HttpException';
import Group from './group.interface';
import hasAdminPermission from '../middlewares/admin.middleware';


const groupService = Container.get(GroupService);

class GroupController implements Controller {
  public path = '/groups';
  public router = Router();


  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/test`, this.test)
    this.router.get(`${this.path}/`, authMiddleware, hasResourcePermissionsMiddleware("group", "create"), hasAdminPermission, this.getAll)
    this.router.post(`${this.path}/add`, authMiddleware, hasResourcePermissionsMiddleware("group", "create"), hasAdminPermission, validationMiddleware(CreateGroupDto), this.createGroup);
    this.router.delete(`${this.path}/`, authMiddleware, hasResourcePermissionsMiddleware("group", "delete"), hasAdminPermission, this.deleteGroup);
    this.router.get(`${this.path}/`, authMiddleware, hasResourcePermissionsMiddleware("group", "read"), hasAdminPermission, this.getGroupById);
    this.router.put(`${this.path}/`, authMiddleware, hasResourcePermissionsMiddleware("group", "read"), hasAdminPermission, this.updateGroup);

  }

  private createGroup = async (request: Request, response: Response, next: NextFunction) => {
    const groupData: CreateGroupDto = request.body;
    try {
      await groupService.createGroup(groupData);
    } catch (err) {
      return next(err)
    }
    return response.status(200).json({
      ...groupData,
      success: true,
      messages: "Success",
    });
  }

  private test = async (request: Request, response: Response, next: NextFunction) => {
    response.send("Luka-Modric-10");
  }

  private getAll = async (request: Request, response: Response, next: NextFunction) => {
    const groupQuery = groupService.getGroups();
    const groups = await groupQuery;
    return response.status(200).json({
      groups,
      success: true,
      messages: "Success",
    });
  }

  private getGroupById = async (request: Request, response: Response, next: NextFunction) => {

    try {
      const id = request.query.groupid;
      if (!id) return next(new HttpException(400, "Please send Id"))

      // const groupId =  request.params.groupId;
      const userQuery = groupService.findGroupById(id.toString())
      const group = await userQuery;
      if (group) {
        return response.status(200).json({
          group,
          success: true,
          messages: "Success",
        });
      } else {
        next(new GroupNotFoundException(id.toString()));
      }
    } catch (e) {
      next(e)
    }

  }

  private deleteGroup = async (request: Request, response: Response, next: NextFunction) => {
    const id = request?.query?.id;
    const groupId = request.query.groupid;
    if (!groupId) return next(new HttpException(400, "Please send Id"))

    try {
      let group = await groupService.deleteGroup(groupId.at.toString());

      return response.status(200).json({
        group,
        success: true,
        messages: "Success",
      });
    } catch (e) {
      next(e)
    }
  }

  private updateGroup = async (request: Request, response: Response, next: NextFunction) => {

    try {
      const id = request.query.id;
      const group: Group = request.body;

      let updatedUser = await groupService.updateGroup(group);

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

export default GroupController;
