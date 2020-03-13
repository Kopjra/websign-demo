export enum HTTP_METHOD {
    "POST" = "POST",
    "GET" = "GET",
    "PUT" = "PUT",
    "DELETE" = "DELETE",
}

export class WIASHTTPRequest {
    private readonly request;
    private readonly authToken: string;

    constructor(request, authToken: string) {
        this.request = request;
        this.authToken = authToken;
    }

    async HTTPCall(method: HTTP_METHOD, endpoint: string, payload?: any): Promise<any> {
        const headers = {
            "Content-Type": "application/json",
        };

        const authHeaders = this.getAuthHeader();
        const params = WIASHTTPRequest.getParameters(method, endpoint, payload);
        const requestBodyPayload = params.requestBodyPayload;
        const urlWithParams = params.url;

        return new Promise<boolean>((accept, reject) => {
            const requestObject = Object.assign(
                {
                    method: method,
                    url: urlWithParams,
                    headers: Object.assign(headers, authHeaders),
                },
                requestBodyPayload,
            );

            return this.request(requestObject, async (err, httpResponse, body) => {
                if (err || httpResponse.statusCode >= 300) {
                    const bodyJSON = WIASHTTPRequest.parseBody(body);
                    const rejectRes = {
                        error: err,
                        statusCode: httpResponse ? httpResponse.statusCode : undefined,
                        statusMessage: httpResponse ? httpResponse.statusMessage : undefined,
                        bodyMessage: bodyJSON && bodyJSON.message ? bodyJSON.message : undefined,
                    };

                    return reject(rejectRes);
                }
                const bodyJSON = WIASHTTPRequest.parseBody(body);
                return accept(bodyJSON);
            });
        });
    }

    private getAuthHeader(): any {
        let authHeaders;
        if (this.authToken) {
            authHeaders = {
                "Authorization": `Basic ${this.authToken}`
            };
        } else {
            throw new Error(`Missing authToken`);
        }
        return authHeaders;
    }

    private static getParameters(method: HTTP_METHOD, url: string, payload?: any): { requestBodyPayload: any, url: string } {
        let requestBodyPayload;
        let urlWithParams = url;
        if (payload) {
            switch (method) {
                case HTTP_METHOD.POST:
                case HTTP_METHOD.PUT:
                    requestBodyPayload = {
                        body: payload,
                        json: true,
                    };
                    break;
                case HTTP_METHOD.GET:
                    urlWithParams = `${url}?`;
                    for (const param in payload) {
                        if (payload.hasOwnProperty(param)) {
                            urlWithParams = `${urlWithParams}${param}=${encodeURI(payload[param])}&`;
                        }
                    }
                    urlWithParams = urlWithParams.slice(0, -1);
                    break;
            }
        }
        return {
            requestBodyPayload: requestBodyPayload,
            url: urlWithParams,
        };
    }

    private static parseBody(body: any): any {
        let res: any;
        if (body) {
            try {
                res = JSON.parse(body);
            } catch (e) {
                res = body;
            }
        }
        if (res === "") {
            res = undefined;
        }
        return res;
    }
}