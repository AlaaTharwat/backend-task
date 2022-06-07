import { Request } from 'express';
import User from '../user/user.interface';

interface RequestWithUser extends Request {
  user: User;
  role: string
}

export default RequestWithUser;
