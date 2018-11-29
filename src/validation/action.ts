import {IValidatorSchema} from "./index";
import Joi from "joi";

export const schema: IValidatorSchema = {
    body: Joi.object({
        type: Joi.string().required().valid("contract", "register"),
    }),
};