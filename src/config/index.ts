import dotenv from 'dotenv';
dotenv.config();

export const config = {
    port: process.env.PORT || 3000,
    csvFilePath: process.env.CSV_FILE_PATH || './data/questions.csv',
};
