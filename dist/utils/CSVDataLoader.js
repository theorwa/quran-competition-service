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
        const filePath = path_1.default.join(__dirname, '../../data/quran.csv');
        fs_1.default.createReadStream(filePath)
            .pipe((0, csv_parser_1.default)())
            .on('data', (row) => {
            this.data.push({
                surahNumber: Number(row.surahNumber),
                surahAyahNumber: Number(row.surahAyahNumber),
                ayahText: row.ayahText,
                id: row.id,
                pageNumber: Number(row.pageNumber),
                surahName: row.surahName,
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
    isDataLoaded() {
        return this.dataLoaded;
    }
    getDataByPageRange(startPage, endPage) {
        if (!this.dataLoaded) {
            throw new Error('CSV data is not loaded yet.');
        }
        return this.data.filter((ayah) => ayah.pageNumber >= startPage && ayah.pageNumber <= endPage);
    }
}
exports.CSVDataLoader = CSVDataLoader;
