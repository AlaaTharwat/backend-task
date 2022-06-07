import { Service, Inject } from 'typedi'

import UserRepository from './user.repository';
import CreateUserDto from './user.dto';
import User from './user.interface';
import UserNotFoundException from '../exceptions/UserNotFoundException';
import UserExistsException from '../exceptions/UserExistsException';
import sendEmail from '../utils/sharedFunctions';
@Service()
class UserService {
  constructor(private readonly UserRepository: UserRepository) { }

  // public user = userModel;

  async findUserByEmail(email: string) {
    return await this.UserRepository.getOneByEmail(email)
  }

  async findUserById(id: string) {
    let user = await this.UserRepository.exists(id);
    if (!user) throw new UserNotFoundException(id);
    return await this.UserRepository.getOneById(id)
  }

  async createUser(user: CreateUserDto) {
    return await this.UserRepository.save(user);
  }

  async deleteUser(id: string) {
    let user = await this.UserRepository.exists(id);
    if (!user) throw new UserNotFoundException(id);
    console.log(user)
   return await this.UserRepository.deleteUser(id);
  }


  async updateUser(updateUser: CreateUserDto, id: string) {
    let user = await this.UserRepository.exists(id);
    if (!user) throw new UserNotFoundException(id);

    let userExists = await this.UserRepository.getOneByEmail(updateUser?.email);
    if (userExists) throw new UserExistsException(id);
    try{
       await sendEmail(updateUser.email);
    }catch(e){
      throw e
    }
    return await this.UserRepository.update(updateUser, id);
  }

  async getAllUsers(groupid: string) {
    let users = await this.UserRepository.getAll();

    if (!groupid) return users

    let usersInGroup = users.filter(user =>
      user.role.some(userRole => userRole.groupId == groupid)
    )

    return usersInGroup
  }
}
export default UserService