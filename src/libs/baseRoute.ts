import {Router} from "express";

export abstract class BaseRoute {
    private readonly _router: Router;
    private readonly _path: string;

    public get router(): Router {
        return this._router;
    }

    public get path(): string {
        return this._path;
    }

    protected constructor(p: string) {
        this._path = p;
        this._router = Router();
    }

    public abstract async init(): Promise<BaseRoute>;
}
