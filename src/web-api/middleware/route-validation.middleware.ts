import { isEmpty, validateOrReject } from 'class-validator';
import { NextFunction, Request, Response } from 'express';

type Class = { new (): any };

export const validations = (token: Class) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { params, query, body } = req;

      const instance = new token();
      !isEmpty(params) && Object.assign(instance, params);
      !isEmpty(query) && Object.assign(instance, query);
      !isEmpty(body) && Object.assign(instance, body);

      await validateOrReject(instance);
      next();
    } catch (error) {
      res.status(400).json(new Error(error as any));
    }
  };
};