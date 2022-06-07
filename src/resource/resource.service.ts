import { Service } from 'typedi'
import resourceModel from "./resource.model"
import "reflect-metadata";

import ResourceRepository from "./resourceRepository";

@Service()
class ResourceService {

  constructor(private readonly resourceRepo: ResourceRepository) {}

  async createResource(data: any) {
      try{
        const resource = await this.resourceRepo.saveResources(data);
          return resource
      }catch(err){
          console.log(err)
      }
  }

  async getResource(name: string){
    const resource = await this.resourceRepo.getResource(name);
      return resource
  }


  async getResources() {
    const resources = await this.resourceRepo.getResources()
    return resources
  }

}
export default ResourceService