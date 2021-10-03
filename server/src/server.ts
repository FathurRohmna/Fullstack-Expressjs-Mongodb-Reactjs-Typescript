import { DocsController } from './docs/docs.controller';
import { CategoryController } from './category/category.controller';
import { ArticleController } from './article/article.controller';
import { UserController } from './user/user.controller';
import { AuthController } from './auth/auth.controller';
import { App } from './app'

const app = new App(
  [
    new AuthController(),
    new UserController(),
    new ArticleController(),
    new CategoryController(),
    new DocsController()
  ]
)

app.listen();
