import {NextFunction, Request, Response} from "express-serve-static-core";

export async function home(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        res.render("wias/home");
    } catch (err) {
        next(err);
    }
}

export async function register(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        res.render("wias/register", (err, html) => {
            if (err) {
                next(err);
            } else {
                // TODO: send to a WIAS interaction
                res.send(html);
            }
        });
    } catch (err) {
        next(err);
    }
}

export async function contract(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        res.render("wias/contract", (err, html) => {
            if (err) {
                next(err);
            } else {
                // TODO: send to a WIAS interaction
                res.send(html);
            }
        });
    } catch (err) {
        next(err);
    }
}

export async function doAction(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        res.render(`wias/thankyou-${req.body.type}`);
    } catch (err) {
        next(err);
    }
}