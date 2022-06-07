import { Service } from 'typedi'
import HttpException from '../exceptions/HttpException';
import CreateCollectionDto from './collection.dto';
import Collection from './collection.interface';
import CollectionModel from './collection.model';

export interface ICollectionrRepository {
	exists(id: string): Promise<boolean>
	getAll(): Promise<Collection []>
	getOneById(id: string): Promise<Collection | null>
	getOneByname(id: string): Promise<Collection | null>
	save(role: CreateCollectionDto): Promise<Collection | null>
	update(attributes: Collection, id: string): Promise<Collection | null>
    deleteCollection(id: string) : Promise<Collection>
}

@Service()
export default class CollectionRepository implements ICollectionrRepository {
	constructor() {}
	

	async exists(id: string): Promise<boolean> {
		try {
			const collection = await CollectionModel.findById(id)
			return !!collection === true
		} catch (error: any) {
			throw error
		}
	}

	async getAll(): Promise<Collection []> {
		try {
			const result = await CollectionModel.find().exec()
			return result
		} catch (error: any) {
			throw error
		}
	}

	async getOneById(id: string): Promise<Collection | null> {
		try {
		const collection = await CollectionModel.findOne({ _id: id })
		return collection ?? null
		}
		catch (error: any) {
			throw error
		}
	}

	async getOneByname(name: string): Promise<Collection | null> {
		try {
			const Collection = await CollectionModel.findOne({name: name})

			return Collection ?? null
		} catch (error: any) {
			throw error
		}
	}

	async save(collection: CreateCollectionDto): Promise<Collection | null> {
		try {
			return  await CollectionModel.create(collection)
		} catch (error: any) {
			throw error
		}
	}

	async update(attributes: CreateCollectionDto, id: string): Promise<Collection | null>{
		try {
            const collection = await CollectionModel.findOne({_id: id})
			return collection
		} catch (error: any) {
			throw error
		}
	}

	async deleteCollection(id: string): Promise<Collection> {
		try {
            const collection = await CollectionModel.findOne({_id: id})
			return collection
		} catch (error: any) {
			throw error
		}
	}
}