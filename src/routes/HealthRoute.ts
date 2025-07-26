import { Router } from 'express';
import { CSVDataLoader } from '../utils/CSVDataLoader';

const router = Router();

router.get('/health', (req, res) => {
    const dataLoader = CSVDataLoader.getInstance();
    res.json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        dataLoaded: dataLoader.isDataLoaded()
    });
});

export default router; 