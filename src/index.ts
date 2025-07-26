import compression from 'compression';
import express from 'express';
import { config } from './config';
import { CSVDataLoader } from "./utils/CSVDataLoader";
import { waitForDataLoad } from "./utils/WaitForDataLoad";
import { setupSwagger } from './utils/swaggerSetup';
import questionRoute from "./routes/QuestionRoute";
import healthRoute from "./routes/HealthRoute";
import cors from 'cors';
import timeoutMiddleware from "./middlewares/timeoutMiddleware";
import loggingMiddleware from "./middlewares/loggingMiddleware";
import rateLimitMiddleware from "./middlewares/rateLimitMiddleware";

const app = express();
app.use(cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
    preflightContinue: false,
    optionsSuccessStatus: 204
}));

app.use(timeoutMiddleware);
app.use(loggingMiddleware);
app.use(rateLimitMiddleware);
app.use(compression());
app.use(express.json());
app.use(healthRoute);
app.use(questionRoute);
setupSwagger(app);

const dataLoader = CSVDataLoader.getInstance();
waitForDataLoad(dataLoader).then(() => {
    app.listen(config.port, () => {
        console.log(`Server running on port ${config.port}`);
        console.log(`Swagger docs available at: http://${process.env.HEROKU_APP_URL || 'localhost:3000'}/api-docs`);
    });
}).catch(error => {
    console.error('Failed to load CSV data:', error);
});