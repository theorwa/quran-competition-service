import fs from 'fs';
import path from 'path';
import csvParser from 'csv-parser';

export interface Ayah {
    prefix: string;
    suffix: string;
    surahNumber: number;
    surahAyahNumber: number;
    ayahText: string;
    id: string;
    pageNumber: number;
    surahName: string;
}

export class CSVDataLoader {
    private static instance: CSVDataLoader;
    private data: Ayah[] = [];
    private dataLoaded: boolean = false;

    private constructor() {
        this.loadData();
    }

    public static getInstance(): CSVDataLoader {
        if (!CSVDataLoader.instance) {
            CSVDataLoader.instance = new CSVDataLoader();
        }
        return CSVDataLoader.instance;
    }

    private loadData(): void {
        const filePath = path.join(__dirname, '../../data/quran.csv');
        fs.createReadStream(filePath)
            .pipe(csvParser())
            .on('data', (row) => {
                this.data.push({
                    surahNumber: Number(row.surahNumber),
                    surahAyahNumber: Number(row.surahAyahNumber),
                    ayahText: row.ayahText,
                    id: row.id,
                    pageNumber: Number(row.pageNumber),
                    surahName: row.surahName,
                    prefix: this.getPrefix(row.ayahText),
                    suffix: this.getSuffix(row.ayahText),
                });
            })
            .on('end', () => {
                this.dataLoaded = true;
                console.log('CSV file successfully loaded');
            })
            .on('error', (error) => {
                console.error('Error loading CSV file:', error);
            });
    }

    private getPrefix(ayahText: string, wordLimit: number = 4): string {
        const words = ayahText.split(' ');
        return words.length > wordLimit ? words.slice(0, wordLimit).join(' ') + ' ...' : ayahText;
    }

    private getSuffix(ayahText: string, wordLimit: number = 4): string {
        const words = ayahText.split(' ');
        return words.length > wordLimit ? '... ' + words.slice(-wordLimit).join(' ') : ayahText;
    }

    public isDataLoaded(): boolean {
        return this.dataLoaded;
    }

    public getDataByPageRange(startPage: number, endPage: number): Ayah[] {
        if (!this.dataLoaded) {
            throw new Error('CSV data is not loaded yet.');
        }
        return this.data.filter(
            (ayah) => ayah.pageNumber >= startPage && ayah.pageNumber <= endPage && ayah.surahAyahNumber >= 1
        );
    }
}
