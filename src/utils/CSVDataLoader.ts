import fs from 'fs';
import path from 'path';
import csvParser from 'csv-parser';
import {ISpecification} from "../specifications/ISpecification";
import {Ayah} from "../models/Ayah";

export class CSVDataLoader {
    private static instance: CSVDataLoader;
    private ayahs: Ayah[] = [];
    private isLoaded: boolean = false;

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
        const filePath = path.join(__dirname, '../../data/quran_v2.csv');
        fs.createReadStream(filePath)
            .pipe(csvParser())
            .on('data', (row) => {
                this.ayahs.push(new Ayah(row));
            })
            .on('end', () => {
                this.isLoaded = true;
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
        return this.isLoaded;
    }

    public getDataByPageRange(startPage: number, endPage: number): Ayah[] {
        if (!this.isLoaded) {
            throw new Error('CSV data is not loaded yet.');
        }
        return this.ayahs.filter(
            (ayah) => ayah.pageNumber >= startPage && ayah.pageNumber <= endPage && ayah.surahAyahNumber >= 1
        );
    }

    public getFilteredAyahs(specification: ISpecification<Ayah>): Ayah[] {
        if (specification) {
            return this.ayahs.filter((ayah) => specification.isSatisfiedBy(ayah));
        }
        return this.ayahs;
    }

    public getFilteredWords(ayahs: Ayah[]): string[] {
        return ayahs.flatMap(ayah => ayah.getWords());
    }

    public getAllWords(): string[] {
        return this.ayahs.flatMap(ayah => ayah.getWords());
    }

}
