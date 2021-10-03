import { RequestWithCategory } from './../common/interfaces/requestWithCategory.interface';
import { Request, Response, Router } from 'express';
import { Controller } from './../common/interfaces/controller.interface';
import ArticleService from './article.service'
import jwtMiddleware from '../auth/middleware/jwt.middleware'

export class ArticleController implements Controller {
  public path = '/article'
  public router = Router()

  constructor(private readonly articleService: ArticleService = new ArticleService ) {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.all(this.path, jwtMiddleware.validJWTNeeded)
    this.router.get(`${this.path}`, this.getAllArticles)
    this.router.get(`${this.path}/length`, this.getArticlesLength)
    this.router.get(`${this.path}/:articleId`, this.getArticleById)
    this.router.post(`${this.path}`, this.createArticle)
    this.router.patch(`${this.path}/:articleId`, this.updateArticle)
    this.router.delete(`${this.path}/:articleId`, this.deleteArticle)
  }

  public getAllArticles = async (req: Request, res: Response) => {
    try {
      const articles = await this.articleService.getArticles()

      res.status(200).json({ articles: articles })
    } catch (error) {
      res.status(400).json({ error_msg: error.message})
    }
  }

  public getArticlesLength = async (req: Request, res: Response) => {
    try {
      const articlesLength = await this.articleService.articlesLength()

      res.status(200).json({ articlesLength: articlesLength })
    } catch (error) {
      res.status(400).json({ error_msg: error.message})
    }
  }

  public getArticleById = async (req: Request, res: Response) => {
    try {
      const user = await this.articleService.getArticleById(req.params.articleId)

      res.status(200).json(user)
    } catch (error) {
      res.status(400).json({ error_msg: error.message})
    }
  }

  public createArticle = async (req: RequestWithCategory, res: Response) => {
    try {
      const articleId = await this.articleService.createArticle(req.body)
      
      res.status(200).json({ ArticleId: articleId })
    } catch (error) {
      res.status(400).json({ error_msg: error.message})
    }
  }

  public updateArticle = async (req: Request, res: Response) => {
    try {
      const articleId = req.params.articleId

      const newArticle = await this.articleService.updateArticle(articleId, req.body)

      res.status(200).send({ newArticle: newArticle })
    } catch (error) {
      res.status(400).json({ error_msg: error.message})
    }
  }

  public deleteArticle = async (req: Request, res: Response) => {
    try {
      const articleId = req.params.articleId

      await this.articleService.removeArticleById(articleId)

      res.status(200).json({ ArticleId: articleId })
    } catch (error) {
      res.status(400).json({ error_msg: error.message})
    }
  }
}
