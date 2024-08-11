import compression from 'compression';
import express from 'express';
import { config } from './config';
import questionRoutes from './routes/questionRoutes';

const app = express();

app.use(compression());
app.use(express.json());
app.use('/api', questionRoutes);

app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
});
