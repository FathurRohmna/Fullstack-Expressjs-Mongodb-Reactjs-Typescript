import { HttpException } from './httpException';

export class UserWithThatEmailDoestExistsException extends HttpException {
  constructor(email: string) {
    super(404, `User with email ${email} does not exists.`);
  }
}
