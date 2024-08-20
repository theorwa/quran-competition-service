import compression from 'compression';
import express from 'express';
import { config } from './config';
import { CSVDataLoader } from "./utils/CSVDataLoader";
import { waitForDataLoad } from "./utils/WaitForDataLoad";
import { setupSwagger } from './utils/swaggerSetup';
import questionRoute from "./routes/QuestionRoute";
import cors from 'cors';

const app = express();
app.use(cors());

app.use(compression());
app.use(express.json());
app.use(questionRoute);
setupSwagger(app);

const dataLoader = CSVDataLoader.getInstance();
waitForDataLoad(dataLoader).then(() => {
    app.listen(config.port, () => {
        console.log(`Server running on port ${config.port}`);
    });
}).catch(error => {
    console.error('Failed to load CSV data:', error);
});