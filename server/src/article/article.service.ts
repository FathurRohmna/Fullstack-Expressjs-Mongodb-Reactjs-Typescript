import { CategoryDocument, Category } from './../category/category.model';
import { UpdateArticleDto } from './dto/update-article.dto';
import { CreateArticleDto } from './dto/create-article.dto';
import { ArticleDocument, Article } from './article.model';
import { Model } from 'mongoose';

class ArticleService {
  constructor(
    private article: Model<ArticleDocument> = Article,
    private category: Model<CategoryDocument> = Category,
  ) {}

  public async getArticles(limit = 25, page = 0) {
    return this.article.find()
      .limit(limit)
      .skip(limit * page)
      .exec()
  }

  public async getArticleById(id: string) {
    return await this.article.findOne({ _id: id })
  }

  public async articlesLength() {
    return await this.article.countDocuments({})
  }

  public async createArticle(articleData: CreateArticleDto) {
    const newArticle = new this.article({
      ...articleData,
      categories: articleData.categories
    })

    await newArticle.save()

    for (let index = 0; index < newArticle.categories.length; index++) {
      const articleId = newArticle.categories[index];
      
      await this.category.updateMany({ '_id': articleId}, { $push: { articles: newArticle._id }})
    }

    return newArticle
  }

  public async updateArticle(articleId: string, articleFields: UpdateArticleDto) {
    await this.article.findOneAndUpdate(
      { _id: articleId },
      { $set: articleFields },
      { new: false }
    ).exec()

    const newArticle = await this.article.findOne({ _id: articleId})

    for (let index = 0; index < newArticle.categories.length; index++) {
      const articleId = newArticle.categories[index];
      
      await this.category.updateMany({ '_id': articleId }, { $set: { articles: newArticle._id }})
    }

    return newArticle;
  }

  public async removeArticleById(articleId: string) {
    const article = await this.article.findOne({ _id: articleId })

    await article.remove()

    for (let index = 0; index < article.categories.length; index++) {
      const articleId = article.categories[index];
      
      await this.category.updateMany({ '_id': articleId }, { $pull: { articles: article._id }})
    }

    return article
  }
}

export default ArticleService
