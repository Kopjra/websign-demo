import {NextFunction, Request, Response} from "express-serve-static-core";
import {InteractionReply, WIASClient} from "../libs/wias/wiasClient";

const wiasClient = new WIASClient();
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
                const oURL = `${process.env.WEBSIGNDEMO_ENDPOINT}/websign/action`;
                wiasClient.interaction(oURL, html)
                    .then((interactionReply: InteractionReply) => {
                        res.redirect(interactionReply.fUrl);
                    });
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
                const oURL = `${process.env.WEBSIGNDEMO_ENDPOINT}/websign/action`;
                wiasClient.interaction(oURL, html)
                    .then((interactionReply: InteractionReply) => {
                        res.redirect(interactionReply.fUrl);
                    });
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