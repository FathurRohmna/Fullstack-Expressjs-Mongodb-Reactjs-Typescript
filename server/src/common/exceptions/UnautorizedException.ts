import { HttpException } from './httpException';

export class UnautorizedException extends HttpException {
  constructor(objectOrError?: string | object | any, description?: string);
}
