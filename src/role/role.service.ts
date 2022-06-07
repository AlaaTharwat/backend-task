import { Service } from 'typedi'
import 'reflect-metadata'

import CreateRoleDto from './role.dto';

import RoleRepository from './role.repository';
import GroupRepository from '../group/group.repository';
import CollectionrNotFoundException from '../exceptions/CollectionNotFoundException';

@Service()
class RoleService {
  constructor(private readonly groupRepo: GroupRepository, private readonly roleRepo: RoleRepository) { }
  async createRole(roleData: CreateRoleDto) {
    const group = await this.groupRepo.exists(roleData.groupId);
    if(!group) throw new CollectionrNotFoundException(roleData.groupId)
    const role = await this.roleRepo.save(roleData);
    return {
      role
    };
  }
}
export default RoleService