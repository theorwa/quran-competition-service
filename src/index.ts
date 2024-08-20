import compression from 'compression';
import express from 'express';
import { config } from './config';
import {CSVDataLoader} from "./utils/CSVDataLoader";
import {waitForDataLoad} from "./utils/WaitForDataLoad";
import questionRoute from "./routes/QuestionRoute";
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import path from "path";
import fs from "fs";

const app = express();
app.use(cors());

app.use(compression());
app.use(express.json());
app.use(questionRoute);

const swaggerFile = path.join(__dirname, 'swagger_output.json');
if (fs.existsSync(swaggerFile)) {
    const swaggerDocument = require(swaggerFile);
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
} else {
    console.warn('Swagger JSON file not found. Run `npm run prebuild` to generate it.');
}

const dataLoader = CSVDataLoader.getInstance();
waitForDataLoad(dataLoader).then(() => {
    app.listen(config.port, () => {
        console.log(`Server running on port ${config.port}`);
    });
}).catch(error => {
    console.error('Failed to load CSV data:', error);
});