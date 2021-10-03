export const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Article Node Application',
      version: '1.0.0',
      description: 'A platform for reading many articles from Fathur Rohman',
    },
    servers: [
      {
        url: 'http://localhost:8080/'
      }
    ],
    components: {
      securitySchemes: {
        jwt: {
          type: 'http',
          scheme: 'bearer',
          in: 'header',
          bearerFormat: 'JWT'
        }
      }
    },
    security: [{
      jwt: []
    }]
  },
  apis: ['./src/docs/apis/*.ts']
}