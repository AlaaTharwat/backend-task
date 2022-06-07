import { Service } from 'typedi'
import "reflect-metadata";
import Resource from './resource.interface';
import ResourceModel from './resource.model';

export interface IResourcerRepository {

    saveResources(resources: Resource[]): Promise<Resource[] | null>
    getResources(): Promise<Resource[] | null>
    getResource(resource: string): Promise<Resource | null>

}

@Service()
export default class ResourceRepository implements IResourcerRepository {
    public resourceModel = ResourceModel;

    constructor() { }
    async getResource(resource: string): Promise<Resource> {
        try {
            const resources = this.resourceModel.findOne({ name: resource })
            return resources
        } catch (err) {
            throw err
        }

    }
    async getResources(): Promise<Resource[]> {

        try {
            const resources = await this.resourceModel.find();
            return resources
        } catch (err) {
            console.log(err)
        }

    }
    async saveResources(resources: Resource[]): Promise<Resource[]> {
        console.log(resources)
        try {
            const resource = await this.resourceModel.insertMany(resources);
            return resource
        } catch (err) {
            console.log(err)
        }
    }
}