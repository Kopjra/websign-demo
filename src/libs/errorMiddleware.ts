import {NextFunction, Request, Response} from "express-serve-static-core";
import {ISObject} from "../utils/general";

export interface IErrorAdapter {
    name: string;
    manageError: (err: any, req: Request, res: Response) => Error;
}

const adapters: ISObject<IErrorAdapter> = {};

function reqSerializer(req) {
    return {
        baseUrl: req.baseUrl,
        body: req.body,
        headers: req.headers,
        httpVersion: req.httpVersion,
        method: req.method,
        originalUrl: req.originalUrl,
        params: req.params,
        query: req.query,
        sessionID: req.sessionID,
        url: req.url,
    };
}

export function register(errorAdapter: IErrorAdapter) {
    adapters[errorAdapter.name] = errorAdapter;
}

export function middleware(err: any, req: Request, res: Response, _next: NextFunction) {
    if (!(res as any)._status) {
        (res as any)._status = 500;
    }

    let error = new Error();
    const adapter = adapters[err.name] || (err.error) ? adapters[err.error.name] : undefined;
    if (adapter) {
        error = adapter.manageError(err, req, res);
    } else {
        const options = {extra: {Request: reqSerializer(req)}};
        if (err.extra) {
            options.extra = {...options.extra, ...err.extra};
        }
        console.log(err);
        error.name = err.name;
        error.message = err.message;
        (error as any).type = err.type;
        console.log(error);
    }

    res.render("error", {error});
}
