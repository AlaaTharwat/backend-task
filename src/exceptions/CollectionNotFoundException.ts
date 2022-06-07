import HttpException from './HttpException';

class CollectionrNotFoundException extends HttpException {
  constructor(id: string) {
    super(404, `Collectionr with id ${id} not found`);
  }
}

export default CollectionrNotFoundException;
