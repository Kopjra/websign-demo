import {NextFunction, Request, Response} from "express-serve-static-core";

export async function home(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        res.render("clean/home");
    } catch (err) {
        next(err);
    }
}

export async function register(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        res.render("clean/register");
    } catch (err) {
        next(err);
    }
}

export async function contract(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        res.render("clean/contract");
    } catch (err) {
        next(err);
    }
}

export async function doAction(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        console.log(req.body);
        res.render(`clean/thankyou-${req.body.type}`, req.body);
    } catch (err) {
        next(err);
    }
}