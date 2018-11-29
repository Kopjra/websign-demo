import {NextFunction, Request, Response} from "express-serve-static-core";

export async function home(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        res.render("home");
    } catch (err) {
        next(err);
    }
}

export async function register(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        res.render("register");
    } catch (err) {
        next(err);
    }
}

export async function contract(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        res.render("contract");
    } catch (err) {
        next(err);
    }
}

export async function doAction(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        res.render(`thankyou-${req.body.type}`);
    } catch (err) {
        next(err);
    }
}