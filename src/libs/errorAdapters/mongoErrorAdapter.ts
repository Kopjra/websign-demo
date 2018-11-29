import {IErrorAdapter} from "../errorMiddleware";

const adapter: IErrorAdapter = {
    name: "MongoError",

    manageError(err, _req, _res) {
        let entity = "Something";
        let message = "error.db.generic";
        switch (err.code) {
            case 11000 :
                message = "error.db.duplicate";
                const match = /"(.*)"/.exec(err.message);
                if (match && match[1]) {
                    entity = match[1];
                }
                break;
        }
        return {name : "Error", message, params: {entity}, type: "ERROR"};
    },
};

export default adapter;
