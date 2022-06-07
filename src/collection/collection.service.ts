import { Service} from 'typedi'
import CollectionExistsException from "../exceptions/CollectionExistsException";
import collectionModel from "./collection.model"
import CreateCollectionDto from './collection.dto';
import CollectionRepository from './collection.repository';
import CollectionrNotFoundException from '../exceptions/CollectionNotFoundException';

@Service()

class CollectionService {

  constructor(private readonly collectionRepo: CollectionRepository) {}

  public collection = collectionModel;

  async createCollection(collectionData: CreateCollectionDto) {

      let collection = await this.collectionRepo.getOneByname(collectionData.name);
      if(collection) throw new CollectionExistsException(collectionData.name)
       collection = await this.collection.create(collectionData);
      return {
        collection
      };
  }


  async findCollectionById(id: string){
    return this.collection.findOne({
        _id: id,
      }).exec()
  }

  async deleteCollection(id: string) {
    let collection = await this.collectionRepo.exists(id);
    if (!collection) throw new CollectionrNotFoundException(id);
   return await this.collectionRepo.deleteCollection(id);
  }

  async updateCollection(updateCollection: CreateCollectionDto, id: string) {
    let Collection = await this.collectionRepo.exists(id);
    if (!Collection) throw new CollectionrNotFoundException(id);

    let userExists = await this.collectionRepo.getOneByname(updateCollection?.name);
    if (userExists) throw new CollectionExistsException(userExists._id);
    return await this.collectionRepo.update(updateCollection, id);
  }
}
export default CollectionService