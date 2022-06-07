import { Service } from 'typedi'
import UserExistsException from "../exceptions/UserExistsException";
import groupModel from "./group.model"
import CreateGroupDto from './group.dto';
import GroupRepository from './group.repository';
import CollectionRepository from '../collection/collection.repository';
import CollectionrNotFoundException from '../exceptions/CollectionNotFoundException';
import CollectionExistsException from '../exceptions/CollectionExistsException';
import HttpException from '../exceptions/HttpException';
import GroupNotFoundException from '../exceptions/GroupNotFoundException';
import Group from './group.interface';

@Service()
class GroupService {
  // public group = groupModel;
  constructor(private readonly groupRepo: GroupRepository,
    private readonly collectionRepo: CollectionRepository) { }

  async createGroup(groupData: CreateGroupDto) {
    try {
      const collection = await this.collectionRepo.getOneById(groupData.collectionIds);
      if (!collection) throw new CollectionrNotFoundException(collection.name);
      let group = await this.groupRepo.getOneByName(groupData.name)
      if (group) throw new CollectionExistsException(group.name)
      group = await this.groupRepo.save(groupData);
      collection.group = group._id;
      this.collectionRepo.update(collection, groupData.collectionIds)
      return {
        group
      };
    } catch (err) {
      throw err
    }
  }

  async getGroups() {
    return this.groupRepo.getAll();
  }

  async findGroupById(id: string) {
    let group = await this.groupRepo.exists(id);
    if (!group) throw new GroupNotFoundException(id);
    return this.groupRepo.getOneById(id);
  }

  async deleteGroup(id: string) {
    let group = await this.groupRepo.exists(id);
    if (!group) throw new GroupNotFoundException(id);
   return await this.groupRepo.deleteGroup(id);
  }


  async updateGroup(updatedGroup: Group) {
    let group = await this.groupRepo.getOneById(updatedGroup._id);
    if (!group) throw new GroupNotFoundException(updatedGroup?._id);

    let groupExists = await this.groupRepo.getOneByName(updatedGroup?.name);
    if (groupExists) throw new UserExistsException(updatedGroup.name);
  
    return await this.groupRepo.update(updatedGroup, group._id.toString());
  }

}
export default GroupService