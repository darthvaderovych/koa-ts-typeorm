import * as Joi from 'joi';
import { Context } from 'koa';

const helpers:{[k: string]: any} = {};

helpers.validateBody = (body:any) => {
  return new Promise((resolve, reject) => {
    const schema = Joi.object().keys({
      username: Joi.string().trim().min(2).max(30).required(),
      password: Joi.string().min(6).max(30).required(),
      email: Joi.string().email({ minDomainAtoms:2 }).required(),
    });

    Joi.validate(body, schema, (err, result) => {
      if (!err) {
        resolve(result);
      }
      reject(err);
    });
  });
};

export default helpers;
