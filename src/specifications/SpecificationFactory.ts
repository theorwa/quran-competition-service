import { ISpecification } from '../specifications/ISpecification';
import { PageRangeSpecification } from '../specifications/PageRangeSpecification';
import { SurahNumberSpecification } from '../specifications/SurahNumberSpecification';
import { JuzNumberSpecification } from '../specifications/JuzNumberSpecification';
import { HizbNumberSpecification } from '../specifications/HizbNumberSpecification';
import { OrSpecification } from '../specifications/OrSpecification';

export class SpecificationFactory {

    static createPageRangeSpecification(query: any): ISpecification<any> | null {
        if (query.start_page && query.end_page) {
            let startPage: number = Number(query.start_page);
            let endPage: number = Number(query.end_page);
            if (startPage > endPage) {
                [startPage, endPage] = [endPage, startPage];
            }
            return new PageRangeSpecification(startPage, endPage);
        }
        return null;
    }

    static createPagesSpecification(query: any): ISpecification<any> | null {
        if (query.pages) {
            const pageSpecs = (query.pages as string).split(',').map(range => {
                const [start, end] = range.split('-').map(Number);
                if (end !== undefined) {
                    return new PageRangeSpecification(start, end);
                } else {
                    return new PageRangeSpecification(start, start);
                }
            });

            return pageSpecs.reduce<ISpecification<any>>(
                (spec1, spec2) => new OrSpecification(spec1, spec2),
                pageSpecs[0]
            );
        }
        return null;
    }

    static createSurahSpecification(query: any): ISpecification<any> | null {
        if (query.surah) {
            const surahNumbers = (query.surah as string).split(',').map(Number);
            const surahSpecs = surahNumbers.map(num => new SurahNumberSpecification(num));
            return surahSpecs.reduce<ISpecification<any>>(
                (spec1, spec2) => new OrSpecification(spec1, spec2),
                surahSpecs[0]
            );
        }
        return null;
    }

    static createJuzSpecification(query: any): ISpecification<any> | null {
        if (query.juz) {
            const juzNumbers = (query.juz as string).split(',').map(Number);
            const juzSpecs = juzNumbers.map(num => new JuzNumberSpecification(num));
            return juzSpecs.reduce<ISpecification<any>>(
                (spec1, spec2) => new OrSpecification(spec1, spec2),
                juzSpecs[0]
            );
        }
        return null;
    }

    static createHizbSpecification(query: any): ISpecification<any> | null {
        if (query.hizb) {
            const hizbNumbers = (query.hizb as string).split(',').map(Number);
            const hizbSpecs = hizbNumbers.map(num => new HizbNumberSpecification(num));
            return hizbSpecs.reduce<ISpecification<any>>(
                (spec1, spec2) => new OrSpecification(spec1, spec2),
                hizbSpecs[0]
            );
        }
        return null;
    }

    static combineSpecifications(specifications: ISpecification<any>[]): ISpecification<any> | null {
        if (specifications.length > 0) {
            return specifications.reduce<ISpecification<any>>(
                (spec1, spec2) => new OrSpecification(spec1, spec2),
                specifications[0]
            );
        }
        return null;
    }
}
