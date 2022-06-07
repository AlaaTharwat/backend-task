import { Service, Inject } from 'typedi'
import CreateRoleDto from './role.dto';
import Role from './role.interface';
import RoleModel from './role.model';

export interface IRolerRepository {
	exists(id: string): Promise<boolean>
	getAll(): Promise<Role []>
	getOneById(id: string): Promise<Role | null>
	save(role: CreateRoleDto): Promise<Role | null>
	update(attributes: Role, id: string): Promise<Role | null>
    deleteRole(id: string) : Promise<Role>
}

@Service()
export default class RoleRepository implements IRolerRepository {
	constructor() {}
	

	async exists(id: string): Promise<boolean> {
		try {
			const RoleInstance = await RoleModel.findById(id)
			return !!RoleInstance === true
		} catch (error: any) {
			throw error
		}
	}

	async getAll(): Promise<Role []> {
		try {
			const result = await RoleModel.find()
			return result
		} catch (error: any) {
			throw error
		}
	}

	async getOneById(id: string): Promise<Role | null> {
		try {
			const Role = await RoleModel.findOne({_id: id})

			return Role ?? null
		} catch (error: any) {
			throw error
		}
	}

	async save(role: CreateRoleDto): Promise<Role | null> {
		try {
			return  await RoleModel.create(role)
		} catch (error: any) {
			throw error
		}
	}

	async update(attributes: Role, id: string): Promise<Role | null>{
		try {
            const role = await RoleModel.findOne({_id: id})
			return role
		} catch (error: any) {
			
			throw error
		}
	}

	async deleteRole(id: string): Promise<Role> {
		try {
            const role = await RoleModel.findOne({_id: id})
			return role
		} catch (error: any) {
			
			throw error
		}
	}
}