"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpecificationFactory = void 0;
const PageRangeSpecification_1 = require("../specifications/PageRangeSpecification");
const SurahNumberSpecification_1 = require("../specifications/SurahNumberSpecification");
const JuzNumberSpecification_1 = require("../specifications/JuzNumberSpecification");
const HizbNumberSpecification_1 = require("../specifications/HizbNumberSpecification");
const OrSpecification_1 = require("../specifications/OrSpecification");
class SpecificationFactory {
    static createPageRangeSpecification(query) {
        if (query.start_page && query.end_page) {
            let startPage = Number(query.start_page);
            let endPage = Number(query.end_page);
            if (startPage > endPage) {
                [startPage, endPage] = [endPage, startPage];
            }
            return new PageRangeSpecification_1.PageRangeSpecification(startPage, endPage);
        }
        return null;
    }
    static createPagesSpecification(query) {
        if (query.pages) {
            const pageSpecs = query.pages.split(',').map(range => {
                const [start, end] = range.split('-').map(Number);
                if (end !== undefined) {
                    return new PageRangeSpecification_1.PageRangeSpecification(start, end);
                }
                else {
                    return new PageRangeSpecification_1.PageRangeSpecification(start, start);
                }
            });
            return pageSpecs.reduce((spec1, spec2) => new OrSpecification_1.OrSpecification(spec1, spec2), pageSpecs[0]);
        }
        return null;
    }
    static createSurahSpecification(query) {
        if (query.surah_number) {
            const surahNumbers = query.surah_number.split(',').map(Number);
            const surahSpecs = surahNumbers.map(num => new SurahNumberSpecification_1.SurahNumberSpecification(num));
            return surahSpecs.reduce((spec1, spec2) => new OrSpecification_1.OrSpecification(spec1, spec2), surahSpecs[0]);
        }
        return null;
    }
    static createJuzSpecification(query) {
        if (query.juz_number) {
            const juzNumbers = query.juz_number.split(',').map(Number);
            const juzSpecs = juzNumbers.map(num => new JuzNumberSpecification_1.JuzNumberSpecification(num));
            return juzSpecs.reduce((spec1, spec2) => new OrSpecification_1.OrSpecification(spec1, spec2), juzSpecs[0]);
        }
        return null;
    }
    static createHizbSpecification(query) {
        if (query.hizb_number) {
            const hizbNumbers = query.hizb_number.split(',').map(Number);
            const hizbSpecs = hizbNumbers.map(num => new HizbNumberSpecification_1.HizbNumberSpecification(num));
            return hizbSpecs.reduce((spec1, spec2) => new OrSpecification_1.OrSpecification(spec1, spec2), hizbSpecs[0]);
        }
        return null;
    }
    static combineSpecifications(specifications) {
        if (specifications.length > 0) {
            return specifications.reduce((spec1, spec2) => new OrSpecification_1.OrSpecification(spec1, spec2), specifications[0]);
        }
        return null;
    }
}
exports.SpecificationFactory = SpecificationFactory;
