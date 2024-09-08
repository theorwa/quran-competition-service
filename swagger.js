
const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Quran Competition Service',
        description: 'API documentation for the Quran Competition Service',
    },
    host: process.env.HEROKU_APP_URL || 'localhost:3000',
    schemes: ['https'], // Ensure this matches your Heroku URL scheme
};

const outputFile = './dist/swagger_output.json';
const routes = ['./src/routes/QuestionRoute.ts'];

swaggerAutogen(outputFile, routes, doc);