import {BaseRoute} from "../libs/baseRoute";
import {contract, doAction, home, register} from "../controllers/wias";
import {validate} from "../validation";

class WiasRoute extends BaseRoute {

    constructor(p: string) {
        super(p);
    }

    public async init(): Promise<WiasRoute> {
        this.router.get("/", home);
        this.router.get("/register", register);
        this.router.get("/contract", contract);

        this.router.post("/action", validate("action"), doAction);

        return this;
    }
}

export const wiasRoute = new WiasRoute("/websign").init();
