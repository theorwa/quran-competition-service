import fs from 'fs';
import csv from 'csv-parser';
import { Question } from '../models/question';

export const parseCSV = (filePath: string): Promise<Question[]> => {
    return new Promise((resolve, reject) => {
        const results: Question[] = [];
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (data) => results.push(data as Question))
            .on('end', () => resolve(results))
            .on('error', (err) => reject(err));
    });
};
