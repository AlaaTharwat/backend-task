import * as cookieParser from 'cookie-parser';
import * as express from 'express';
import * as mongoose from 'mongoose';
import Controller from './interfaces/controller.interface';
import Seeder from './seeder';
import errorMiddleware from './middlewares/error.middleware';


class App {
  public app: express.Application;

  constructor(controllers: Controller[]) {
    this.app = express();
    this.connectToTheDatabase();
    this.initializeMiddlewares();
    this.initializeControllers(controllers);
    new Seeder().seedResource();
    this.initializeErrorHandling();

  }

  public listen() {
    this.app.listen(process.env.PORT ?? 7400, () => {
      console.log(`App listening on the port ${process.env.PORT}`);
    });
  }

  public getServer() {
    return this.app;
  }

  private initializeMiddlewares() {
    this.app.use(express.json({limit: '50mb'}));
    this.app.use(express.urlencoded({limit: '50mb', extended: true}));
    this.app.use(cookieParser());
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }

  private initializeControllers(controllers: Controller[]) {
    controllers.forEach((controller) => {
      this.app.use('/', controller.router);
    });
  }

  private connectToTheDatabase() {
    mongoose.connect(`mongodb://localhost/backent-task`);
  }

}

export default App;
