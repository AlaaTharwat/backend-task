import { Container } from 'typedi'
import { NextFunction, Response } from 'express';
import RequestWithUser from '../interfaces/requestWithUser.interface';
import NotAuthorizedException from '../exceptions/NotAuthorizedException';
import UserService from '../user/user.service';
import ResourceService from '../resource/resource.service';

const userService = Container.get(UserService);
const resourceService = Container.get(ResourceService);


// Authorize resource_action
function hasResourcePermissionsMiddleware(resourceValue: string, method: string) {
    return async (request: RequestWithUser, response: Response, next: NextFunction) => {
      const user = await userService.findUserById(request.user._id);
      const requestedUserRole = user.role.find(r => r.groupId == request.query?.groupid || !r.groupId );
      request.role = requestedUserRole?.role  //get role by groupId  and pass it with request to next MW
      if(!requestedUserRole)  return next(new NotAuthorizedException())
      const privillages = await resourceService.getResource(resourceValue);
      let resource_privillage = privillages?.resources_roles.find(role => role?.role_name === requestedUserRole.role);
      if (!resource_privillage) return next(new NotAuthorizedException())
      if (resource_privillage[method]) return next();

      return next(new NotAuthorizedException())
    }
}
export default hasResourcePermissionsMiddleware;
