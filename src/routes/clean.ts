import {BaseRoute} from "../libs/baseRoute";
import {contract, doAction, home, register} from "../controllers/clean";
import {validate} from "../validation";

class CleanRoute extends BaseRoute {

    constructor(p: string) {
        super(p);
    }

    public async init(): Promise<CleanRoute> {

        this.router.get("/", home);
        this.router.get("/register", register);
        this.router.get("/contract", contract);

        this.router.post("/action", validate("action"), doAction);

        return this;
    }
}

export const cleanRoute = new CleanRoute("/clean").init();
