import express, {Application} from "express";
import bodyParser = require("body-parser");
import path from "path";
import {cleanRoute} from "./routes/clean";
import {middleware, register} from "./libs/errorMiddleware";
import {AddressInfo} from "net";
import {print} from "./libs/asciiart";
import joiErrorAdapter from "./libs/errorAdapters/joiErrorAdapter";
import {wiasRoute} from "./routes/wias";

register(joiErrorAdapter);

export class Server {
    private readonly app: Application;

    private constructor() {
        this.app = express();
    }

    public static async bootstrap(): Promise<Server> {
        const web: Server = new Server();

        await web.config();

        await web.routes();

        web.errorHandling();

        return web;
    }

    public start(): Application {
        const server = this.app.listen(process.env.PORT, () => {
            print(`WEB : ${(server.address() as AddressInfo).port}`);
        });

        return this.app;
    }

    private async config() {
        this.app.set('views', path.join(__dirname, 'views'));
        this.app.set('view engine', 'hbs');

        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: true}));

        this.app.use(express.static(path.join(__dirname, 'public')));
    }

    private async routes() {
        this.app.use((await cleanRoute).path, (await cleanRoute).router);
        this.app.use((await wiasRoute).path, (await wiasRoute).router);
    }

    private errorHandling() {
        this.app.use(middleware);
    }
}

(async () => {
    const server: Server = await Server.bootstrap();
    await server.start();
})();