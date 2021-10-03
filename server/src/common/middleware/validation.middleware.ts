import { HttpException } from './../exceptions/httpException';
import { plainToClass } from 'class-transformer'
import { validate, ValidationError } from 'class-validator'
import { RequestHandler } from 'express'

export function validationMiddleware<T>(type: any, skipMissingProperties = false): RequestHandler {
  return (req, res, next) => {
    validate(plainToClass(type, req.body), { skipMissingProperties }
  ) 
    .then((errors: ValidationError[]) => {
      if (errors.length > 0) {
        const message = errors.map((error: ValidationError) =>
          Object.values(error.constraints)).join(', ')
        res.send({ error_msg: message})
        // next(new HttpException(400, message))
      } else {
        next()
      }
    })
  }
}
