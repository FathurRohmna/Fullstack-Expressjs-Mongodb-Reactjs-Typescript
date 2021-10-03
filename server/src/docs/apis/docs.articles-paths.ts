/**
 * @swagger
 *    /article:
 *      get:
 *        summary: Get All Articles
 *        tags: [Article]
 *        responses:
 *          "200":
 *            description: All Articles
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/Article' 
 */

/**
 * @swagger
 *    /article/{articleId}:
 *      get:
 *        summary: Get article by Id
 *        tags: [Article]
 *        parameters:
 *          - in: path
 *            name: articleId
 *            schema:
 *              type: string
 *            required: true
 *            description: Article Id
 *        responses:
 *          "200":
 *            desciption: Get Article by Id
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/Article' 
 */

/**
 * @swagger
 *    /article:
 *      post:
 *        summary: Create article
 *        tags: [Article]
 *        requestBody:
 *          required: true
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Article'
 *        responses:
 *          "201":
 *            description: The article schema
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/Article' 
 */

 /**
 * @swagger
 *    /article/{articleId}:
 *      patch:
 *        summary: Update article
 *        tags: [Article]
 *        parameters:
 *          - in: path
 *            name: articleId
 *            schema:
 *              type: string
 *            required: true
 *            description: Article Id
 *        requestBody:
 *          required: true
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Article'
 *        responses:
 *          "201":
 *            description: The article schema
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/Article' 
 */

 /**
 * @swagger
 *    /article/{articleId}:
 *      delete:
 *        summary: Delete article by Id
 *        tags: [Article]
 *        parameters:
 *          - in: path
 *            name: articleId
 *            schema:
 *              type: string
 *            required: true
 *            description: Article Id
 *        responses:
 *          "200":
 *            desciption: Delete article by Id
 */
