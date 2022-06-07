import { Service } from 'typedi'
import HttpException from '../exceptions/HttpException';
import CreateGroupDto from './group.dto';
import Group from './group.interface';
import GroupModel from './group.model';

export interface IGrouprRepository {
	exists(id: string): Promise<boolean>
	getAll(): Promise<Group []>
	getOneByName(name: string): Promise<Group | null>
	getOneById(id: string): Promise<Group | null>
	save(role: CreateGroupDto): Promise<Group | null>
	update(attributes: Group, id: string): Promise<Group | null>
    deleteGroup(id: string) : Promise<Group>
}

@Service()
export default class GroupRepository implements IGrouprRepository {
	constructor() {}
	async getOneById(id: string): Promise<Group> {
		try {
			const group = await GroupModel.findOne({_id: id}).exec();
			return group ?? null
		} catch (error: any) {
			throw error
		}
	}
	async getOneByName(name: string): Promise<Group> {
		try {
			const group = await GroupModel.findOne({ name: name })
			return group ?? null
		} catch (error: any) {
			throw error
		}
	}


	async exists(id: string): Promise<boolean> {
		try {
			const group = await GroupModel.findOne({ _id: id })
			console.log(id)
			return !!group === true
		} catch (error: any) {
			throw error
		}
	}

	async getAll(): Promise<Group []> {
		try {
			const result = await GroupModel.find().exec()
			return result
		} catch (error: any) {
			throw error
		}
	}



	async save(group: CreateGroupDto): Promise<Group | null> {
		try {
			return  await GroupModel.create(group)
		} catch (error: any) {
			throw error
		}
	}

	async update(attributes: Group, id: string): Promise<Group | null>{
		try {
            const group = await GroupModel.findOne({_id: id})
			return group
		} catch (error: any) {
			throw error
		}
	}

	async deleteGroup(id: string): Promise<Group> {
		try {
			return  await GroupModel.remove({_id: id})
		} catch (error: any) {
			throw error
		}
	}
}