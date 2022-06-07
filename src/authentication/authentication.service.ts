import { Service, Inject } from 'typedi'
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import 'reflect-metadata'
import UserExistsException from '../exceptions/UserExistsException';
import WrongCredentialsException from '../exceptions/WrongCredentialsException';
import DataStoredInToken from '../interfaces/dataStoredInToken';
import TokenData from '../interfaces/tokenData.interface';
import CreateUserDto from '../user/user.dto';
import User from '../user/user.interface';
import UserService from '../user/user.service';
import userModel from './../user/user.model';
import UserRepository from '../user/user.repository';

@Service()
class AuthenticationService {
  constructor(private readonly userRepository: UserRepository) {
  }

  // public user = userModel;
  // public userService =  new UserService();


  public async register(userData: CreateUserDto) {
    // if (
    //   await this.user.findOne({ email: userData.email })
    // ) {
    //   throw new UserExistsException(userData.email);
    // }

    if (
      await this.userRepository.getOneByEmail(userData.email)
    ) {
      throw new UserExistsException(userData.email);
    }
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    // const user = await this.user.create({
    //   ...userData,
    //   password: hashedPassword,
    // });

    const user = await this.userRepository.save({
      ...userData,
      password: hashedPassword,
    });
    const tokenData = this.createToken(user);
    const cookie = this.createCookie(tokenData);

    return {
      cookie,
      user,
    };
  }
  public createCookie(tokenData: TokenData) {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn}`;
  }
  public createToken(user: User): TokenData {
    const expiresIn = 60 * 60; // an hour
    const secret = process.env.JWT_SECRET;
    const dataStoredInToken: DataStoredInToken = {
      _id: user._id,
      role: user.role
    };
    return {
      expiresIn,
      token: jwt.sign(dataStoredInToken, secret, { expiresIn }),
    };
  }

  public async getAuthenticatedUser(email: string, password: string) {
    const user = await this.userRepository.getOneByEmail(email);
    if (user) {
      await this.verifyPassword(password, user.password)
      const tokenData = this.createToken(user);
      let obj: any = user;
      obj.tokenData = tokenData
      return obj
    } else {
      throw new WrongCredentialsException();
    }

  }

  private async verifyPassword(
    plainTextPassword: string,
    hashedPassword: string,
  ) {
    const isPasswordMatching = await bcrypt.compare(
      plainTextPassword,
      hashedPassword,
    );
    if (!isPasswordMatching) {
      throw new WrongCredentialsException()
    }
  }
}

export default AuthenticationService;
