import {BaseRoute} from "../libs/baseRoute";
import {contract, doAction, home, register} from "../controllers";
import {validate} from "../validation";

class IndexRoute extends BaseRoute {

    constructor(p: string) {
        super(p);
    }

    public async init(): Promise<IndexRoute> {

        this.router.get("/", home);
        this.router.get("/register", register);
        this.router.get("/contract", contract);

        this.router.post("/action", validate("action"), doAction);

        return this;
    }
}

export const indexRoute = new IndexRoute("").init();
