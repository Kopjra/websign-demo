import {HTTP_METHOD, WIASHTTPRequest} from "./wiasHTTPRequest";
import * as request from "request";

export type InteractionReply = {
    id: number,
    fUrl: string,
};

export class WIASClient {
    private httpRequest: WIASHTTPRequest;

    constructor() {
        this.httpRequest = new WIASHTTPRequest(request, process.env.WIAS_APIKEY as string);
    }

    async interaction(oURL: string, prerenderedHtml: string): Promise<InteractionReply> {
        const payload = {
            oURL: oURL,
            prerenderedHtml: prerenderedHtml,
            // tags: {nome: "valore"},
        };

        return this.httpRequest.HTTPCall(
            HTTP_METHOD.POST,
            `${process.env.WIAS_ENDPOINT}/interations`,
            payload);
    }
}