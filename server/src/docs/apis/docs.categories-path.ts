/**
 * @swagger
 *    /category:
 *      get:
 *        summary: Get all Categories
 *        tags: [Category]
 *        responses:
 *          "200":
 *            description: Categories Schema
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/Category' 
 */

/**
 * @swagger
 *    /category/{categoryId}:
 *      get:
 *        summary: Get Category By Id
 *        tags: [Category]
 *        parameters:
 *          - in: path
 *            name: categoryId
 *            schema:
 *              type: string
 *            required: true
 *            description: Category Id
 *        responses:
 *          "200":
 *            description: Get Category By Id
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/Category' 
 */

/**
 * @swagger
 *    /category:
 *      post:
 *        summary: Create Category
 *        tags: [Category]
 *        requestBody:
 *          required: true
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Category' 
 *        responses:
 *          "201":
 *            description: The article schema
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/Category' 
 */

 /**
 * @swagger
 *    /category/{categoryId}:
 *      delete:
 *        summary: Delete category by Id
 *        tags: [Category]
 *        parameters:
 *          - in: path
 *            name: categoryId
 *            schema:
 *              type: string
 *            required: true
 *            description: Category Id
 *        responses:
 *          "200":
 *            desciption: Delete category by Id
 */