import {IErrorAdapter} from "../errorMiddleware";

const adapter: IErrorAdapter = {
    name: "ValidationError",

    manageError(err, _req, _res) {
        if (err.error && err.error.isJoi) {
            return {name: "ValidationError", message: err.error.message, type: "ERROR"};
        } else {
            return {name: "ValidationError", message: "Generic", type: "ERROR"};
        }
    },
};

export default adapter;
