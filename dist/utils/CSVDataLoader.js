"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CSVDataLoader = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const csv_parser_1 = __importDefault(require("csv-parser"));
class CSVDataLoader {
    constructor() {
        this.data = [];
        this.dataLoaded = false;
        this.loadData();
    }
    static getInstance() {
        if (!CSVDataLoader.instance) {
            CSVDataLoader.instance = new CSVDataLoader();
        }
        return CSVDataLoader.instance;
    }
    loadData() {
        const filePath = path_1.default.join(__dirname, '../../data/quran_v2.csv');
        fs_1.default.createReadStream(filePath)
            .pipe((0, csv_parser_1.default)())
            .on('data', (row) => {
            this.data.push({
                id: row.id,
                globalAyahNumber: Number(row.globalAyahNumber),
                surahNumber: Number(row.surahNumber),
                surahName: row.surahName,
                surahAyahNumber: Number(row.surahAyahNumber),
                ayahText: row.ayahText,
                pageNumber: Number(row.pageNumber),
                pageAyatCount: Number(row.pageAyatCount),
                firstAyahInPage: row.firstAyahInPage === '1',
                juzNumber: Number(row.juzNumber),
                hizbNumber: Number(row.hizbNumber),
                rubNumber: Number(row.rubNumber),
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
    getPrefix(ayahText, wordLimit = 4) {
        const words = ayahText.split(' ');
        return words.length > wordLimit ? words.slice(0, wordLimit).join(' ') + ' ...' : ayahText;
    }
    getSuffix(ayahText, wordLimit = 4) {
        const words = ayahText.split(' ');
        return words.length > wordLimit ? '... ' + words.slice(-wordLimit).join(' ') : ayahText;
    }
    isDataLoaded() {
        return this.dataLoaded;
    }
    getDataByPageRange(startPage, endPage) {
        if (!this.dataLoaded) {
            throw new Error('CSV data is not loaded yet.');
        }
        return this.data.filter((ayah) => ayah.pageNumber >= startPage && ayah.pageNumber <= endPage && ayah.surahAyahNumber >= 1);
    }
}
exports.CSVDataLoader = CSVDataLoader;
