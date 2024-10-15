import express, {
	Application,
	Router,
} from "express";
import cors from "cors";
import { attachControllers } from '@decorators/express';
import { CatController } from "../web-api/controllers/cat.controller";
import { ImagesController } from "../web-api/controllers/images.controller";
import { AppDataSource } from "../../ormconfig";
import { UserController } from "../web-api/controllers/user.controller";

class Server {
    private readonly app: Application;
    private readonly router: Router;

    get instance() : Application {
        return this.app;
    }

    constructor() {
        this.connectDatabase();
        this.app = express();
        this.router = Router();

        this.configurations();
    }

    private async configurations() {
		//await initializeDatabase();

		this.app.use(express.json());
        this.app.use(cors({ origin: "*" }));

        await attachControllers(this.router, [CatController, ImagesController, UserController]);
        this.app.use("/api/v1", this.router);
    }

    private async connectDatabase() {
        AppDataSource.initialize()
          .then(() => {
            console.log("Data Source has been initialized!");
          })
          .catch((err) => {
            console.error("Error during Data Source initialization:", err);
          });
      }
}

export default new Server();