import { Container } from 'typedi'
import { Router, Request, Response, NextFunction } from 'express';
import Controller from '../interfaces/controller.interface';
import CollectionService from './collection.service';
import authMiddleware from '../middlewares/auth.middleware';
import CollectionNotFoundException from '../exceptions/CollectionNotFoundException';
import CreateColeectionDto from './collection.dto';
import hasResourcePermissionsMiddleware from '../middlewares/hasResourceAction.middleware';
import HttpException from '../exceptions/HttpException';
import hasAdminPermission from '../middlewares/admin.middleware';

const collectionService = Container.get(CollectionService);

class CollectionController implements Controller {
  public path = '/collections';
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/add`, authMiddleware, hasResourcePermissionsMiddleware("collection", "create")
      , hasAdminPermission, this.createCollection)
    this.router.get(`${this.path}`, authMiddleware, hasResourcePermissionsMiddleware("collection", "create")
      , hasAdminPermission, this.getCollectionById);

    this.router.put(`${this.path}`, authMiddleware, hasResourcePermissionsMiddleware("collection", "update")
      , hasAdminPermission, this.updateCollection);

    this.router.delete(`${this.path}`, authMiddleware, hasResourcePermissionsMiddleware("collection", "delete")
      , hasAdminPermission, this.DeleteCollection);
  }

  private createCollection = async (request: Request, response: Response, next: NextFunction) => {
    const collectionData: CreateColeectionDto = request.body;
    try {
      const {
        collection
      } = await collectionService.createCollection(collectionData);
      return response.status(200).json({
        collection,
        success: true,
        messages: "Success",
      });
    } catch (error) {
      return next(error);
    }
  }

  private getCollectionById = async (request: Request, response: Response, next: NextFunction) => {
    const id = request.query.id;
    if (!id) return next(new HttpException(400, "Please send Id"))
    const collectionQuery = collectionService.findCollectionById(id?.toString());
    const collection = await collectionQuery;
    if (collection) {
      return response.status(200).json({
        collection,
        success: true,
        messages: "Success",
      });
    } else {
      return next(new CollectionNotFoundException(id?.toString()));
    }
  }

  private updateCollection = async (request: Request, response: Response, next: NextFunction) => {

    try {
      const id = request.query.id;
      const collection: CreateColeectionDto = request.body;
      if (!id) return next(new HttpException(400, "Please send Id"))
      let updatedUser = await collectionService.updateCollection(collection, id?.toString());

      return response.status(200).json({
        updatedUser,
        success: true,
        messages: "Success",
      });
    } catch (e) {
      next(e)
    }
  }

  private DeleteCollection = async (request: Request, response: Response, next: NextFunction) => {
    const id = request.query.id;
    if (!id) return next(new HttpException(400, "Please send Id"))

    try {
      let collection = await collectionService.deleteCollection(id.toString());

      return response.status(200).json({
        collection,
        success: true,
        messages: "Success",
      });
    } catch (e) {
      next(e)
    }
  }
}

export default CollectionController;
