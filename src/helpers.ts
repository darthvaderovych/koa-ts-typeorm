import * as Joi from 'joi';

const helpers:{[k: string]: any} = {};

helpers.validateUserData = (body:any) => {
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

helpers.validateAuthData = (body:any) => {
  return new Promise((resolve, reject) => {
    const schema = Joi.object().keys({
      username: Joi.string().trim().min(2).max(30).required(),
      password: Joi.string().min(6).max(30).required(),
    });

    Joi.validate(body, schema, (err, result) => {
      if (!err) {
        resolve(result);
      }
      reject(err);
    });
  });
};

helpers.createToken = (username:string, password:string) => {
  const data = username + password;
  const token = Buffer.from(data).toString('base64');
  return token;
};

export default helpers;
