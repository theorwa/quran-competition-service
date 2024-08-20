const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Quran Competition Service',
        description: 'API documentation for the Quran Competition Service',
    },
    host: 'localhost:3000'
};

const outputFile = './dist/swagger_output.json';
const routes = ['./src/routes/QuestionRoute.ts'];

swaggerAutogen(outputFile, routes, doc);