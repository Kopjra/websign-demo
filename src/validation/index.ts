import {RequestHandler} from "express";
import validatorFunc from "express-joi-validation";
import * as Joi from "joi";

const validator = validatorFunc({passError: true});

export interface IValidatorSchema {
    body?: Joi.ObjectSchema;
    query?: Joi.ObjectSchema;
    params?: Joi.ObjectSchema;
    headers?: Joi.ObjectSchema;
    fields?: Joi.ObjectSchema;
    response?: Joi.ObjectSchema;
}

export function validate(name: string): RequestHandler[] | RequestHandler {
    const validatorSchema: IValidatorSchema = require(`./${name}`).schema;
    const handlers: RequestHandler[] = Object.keys(validatorSchema).map((key) => validator[key](validatorSchema[key]));
    return (handlers.length === 1) ? handlers[0] : handlers;
}