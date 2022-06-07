import { Service, Inject } from 'typedi'
import CreateUserDto from './user.dto';
import User from './user.interface';
import UserModel from './user.model';

export interface IUserRepository {
	exists(id: string): Promise<boolean>
	getAll(): Promise<User []>
	getOneById(id: string): Promise<User | null>
	getOneByEmail(id: string): Promise<User | null>
	save(user: CreateUserDto): Promise<User | null>
	update(attributes: CreateUserDto, id: string): Promise<User | null>
    deleteUser(userId: string) : Promise<User>
}

@Service()
export default class UserRepository implements IUserRepository {
	constructor() {}

	async exists(id: string): Promise<boolean> {
		try {
			const UserInstance = await UserModel.findById(id)
			return !!UserInstance === true
		} catch (error: any) {
			throw error
		}
	}

	async getAll(): Promise<User []> {
		try {
			const result = await UserModel.find().populate("role").exec();
			return result
		} catch (error: any) {
			throw error
		}
	}

	async getOneById(id: string): Promise<User | null> {
		try {
			const User = await UserModel.findOne({_id: id}).populate("role").exec();

			return User ?? null
		} catch (error: any) {
			throw error
		}
	}

	async getOneByEmail(email: string): Promise<User | null> {
		try {
			const User = await UserModel.findOne({email: email}).exec();

			return User ?? null
		} catch (error: any) {
			throw error
		}
	}

	async save(user: CreateUserDto): Promise<User | null> {
		try {
			return  await UserModel.create(user)
		} catch (error: any) {
			throw error
		}
	}

	async update(updatedUser: CreateUserDto, id:string): Promise<User | null>{
		try {
            const user = await UserModel.findOne({_id: id});
			user.email = updatedUser.email;
			await user.save();
			return user
		} catch (error: any) {
			throw error
		}
	}

	async deleteUser(userId: string): Promise<User> {
		try {
            const user = await UserModel.remove({_id: userId})
			return user
		} catch (error: any) {
			throw error
		}
	}
 
}