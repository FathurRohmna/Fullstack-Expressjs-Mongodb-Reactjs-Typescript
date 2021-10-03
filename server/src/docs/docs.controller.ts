import { options } from './docs.swagger';
import { Router } from 'express';
import { Controller } from './../common/interfaces/controller.interface';

import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

export class DocsController implements Controller {
  public path = '/docs'
  public router = Router()

  constructor() {
    this.initializeRoutes()
  }

  private specs = swaggerJsdoc(options)

  private initializeRoutes() {
    this.router.use(this.path, swaggerUi.serve)
    this.router.get(this.path, swaggerUi.setup(this.specs, { explorer: true }))
  }
}