import HttpException from './HttpException';

class CollectionExistsException extends HttpException {
  constructor(name: string) {
    super(400, `Collection with name ${name} already exists`);
  }
}

export default CollectionExistsException;
