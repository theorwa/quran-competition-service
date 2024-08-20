import swaggerUi from 'swagger-ui-express';
import path from 'path';
import fs from 'fs';
import { Express } from 'express';

export const setupSwagger = (app: Express) => {
    const swaggerFile = path.join(__dirname, '../../dist/swagger_output.json');
    if (fs.existsSync(swaggerFile)) {
        const swaggerDocument = require(swaggerFile);
        app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    } else {
        console.warn('Swagger JSON file not found. Run `npm run prebuild` to generate it.');
    }
};
