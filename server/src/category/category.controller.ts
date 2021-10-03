import { Router, Request, Response } from 'express';
import { Controller } from './../common/interfaces/controller.interface';
import CategoryService from './category.service'
import jwtMiddleware from '../auth/middleware/jwt.middleware'

export class CategoryController implements Controller {
  public path = '/category'
  public router = Router()

  constructor(private readonly categoryService: CategoryService = new CategoryService) {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.all(this.path, jwtMiddleware.validJWTNeeded)
    this.router.get(this.path, this.getAllCategories)
    this.router.get(`${this.path}/length`, this.getCategoriesLength)
    this.router.get(`${this.path}/:categoryId`, this.getCategoryById)
    this.router.post(this.path, this.createCategory)
    this.router.delete(`${this.path}/:categoryId`, this.deleteCategory)
  }

  public getAllCategories = async (req: Request, res: Response) => {
    try {
      const categories = await this.categoryService.getCategories()

      res.status(200).json({ categories: categories })
    } catch (error) {
      res.status(400).json({ error_msg: error.message})
    }
  }

  public getCategoriesLength = async (req: Request, res: Response) => {
    try {
      const categoriesLength = await this.categoryService.categoryLength()

      res.status(200).json({ categoriesLength: categoriesLength })
    } catch (error) {
      res.status(400).json({ error_msg: error.message})
    }
  }

  public getCategoryById = async (req: Request, res: Response) => {
    try {
      const category = await this.categoryService.getCategoryById(req.params.categoryId)

      res.status(200).send(category)
    } catch (error) {
      res.status(400).json({ error_msg: error.message})
    }
  }

  public createCategory = async (req: Request, res: Response) => {
    try {
      const categoryId = await this.categoryService.createCategory(req.body)

      res.status(200).json({ CategoryId: categoryId })
    } catch (error) {
      res.status(400).json({ error_msg: error.message})
    }
  }

  public deleteCategory = async (req: Request, res: Response) => {
    try {
      const categoryId = req.params.categoryId

      await this.categoryService.removeCategoryById(categoryId)

      res.status(200).json({ CategoryId: categoryId })
    } catch (error) {
      res.status(400).json({ error_msg: error.message})
    }
  }
}