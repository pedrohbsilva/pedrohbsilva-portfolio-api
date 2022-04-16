import swaggerAutogen from 'swagger-autogen';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config();
const outputFile = path.join(__dirname, 'document.json');
const endpointsFiles = [`./src/shared/infra/http/routes/index`];
const doc = {
  info: {
    version: '1.0.0',
    title: 'Api Portfolio',
    description:
      'Nesta Api, encontrará diversas funcionalidades para um portfolio',
  },
  servers: [
    {
      url: process.env.PROD_HOST,
      description: 'Production server',
      templates: {
        scheme: {
          enum: ['https'],
          default: 'https',
        },
      },
    },
    {
      url: 'http://localhost:3333/',
      description: 'Development server',
      templates: {
        scheme: {
          enum: ['http', 'https'],
          default: 'https',
        },
      },
    },
  ],
  consumes: ['application/json'],
  produces: ['application/json'],
  securityDefinitions: {
    api_key: {
      type: 'apiKey',
      name: 'api_key',
      in: 'header',
    },
  },
};

swaggerAutogen({ openapi: '3.0.0' })(outputFile, endpointsFiles, doc).then(
  async () => {
    await import('./server');
  },
);
