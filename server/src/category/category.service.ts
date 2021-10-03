import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoryDocument, Category } from './category.model';
import { ArticleDocument, Article } from '../article/article.model';
import { Model } from 'mongoose';

class CategoryService {
  constructor(
    private article: Model<ArticleDocument> = Article,
    private category: Model<CategoryDocument> = Category
  ) {}

  public async getCategories() {
    return await this.category.find()
      .exec()
  }

  public async categoryLength() {
    return await this.category.countDocuments({})
  }

  public async getCategoryById(id: string) {
    return await this.category.findOne({ _id: id })
  }

  public async createCategory(categoryData: CreateCategoryDto) {
    const newCategory = new this.category(categoryData)

    await newCategory.save()

    return newCategory
  }

  public async removeCategoryById(id: string) {
    const category =  await this.category.findOne({ _id: id })
    
    await category.remove()

    for (let index = 0; index < category.articles.length; index++) {
      const categoryId  = category.articles[index];

      await this.article.updateMany({ '_id': categoryId }, { $pull: { categories: category._id }})
    }
  }
}

export default CategoryService
