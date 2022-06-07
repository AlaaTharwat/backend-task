import 'dotenv/config';
import App from './app';
import AuthenticationController from './authentication/authentication.controller';
import UserController from './user/user.controller';
import RoleController from './role/role.controller';
import CollectionController from './collection/collection.controller';
import GroupController from './group/group.controller';


const app = new App(
  [
   new AuthenticationController(),
    new UserController(),
    new RoleController(),
    new CollectionController(),
    new GroupController()

  ],
);

app.listen();
