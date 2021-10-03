/** 
 * @swagger
 *    components:
 *      schemas:
 *        Article:
 *          type: object
 *          required:
 *            - title
 *            - content
 *            - description
 *            - paid
 *            - categories
 *          properties:
 *            _id:
 *              type: string
 *              readOnly: true
 *            title:
 *              type: string
 *              description: The Title article
 *              minimum: 6
 *              maximum: 1024
 *            content:
 *              type: string
 *              description: The Content article
 *              minimum: 6
 *              maximum: 1024
 *            description:
 *              type: string
 *              description: The Description article
 *              minimum: 6
 *              maximum: 1024
 *            paid:
 *              type: Boolean
 *              description: Free or Pain
 *            categories:
 *              type: Array
 *              description: The article Categories
 *            createdAt:
 *              type: Date
 *              description: Article create date
 *              readOnly: true
 *          example:
 *            title: Article title
 *            content: Article content
 *            description: Article description
 *            paid: true
 *            categories: [ "87234hjasda", "897324237ahjk" ]
*/

/**
 * @swagger
 *    components:
 *      schemas:
 *        Category:
 *          type: object
 *          required:
 *            - name
 *          properties:
 *              id:
 *                type: string
 *                readonly: true
 *              name:
 *                type: string
 *                description: The user fullname
 *                minimum: 6
 *                maximum: 1024
 *              articles:
 *                type: array
 *                description: Articles
 */
