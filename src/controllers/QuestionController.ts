import { Request, Response } from 'express';
import { QuestionGeneratorFactory } from '../generators/QuestionGeneratorFactory';
import { QuestionType } from '../models/QuestionType';
import { ISpecification } from '../specifications/ISpecification';
import { PageRangeSpecification } from '../specifications/PageRangeSpecification';
import { SurahNumberSpecification } from '../specifications/SurahNumberSpecification';
import { JuzNumberSpecification } from '../specifications/JuzNumberSpecification';
import { HizbNumberSpecification } from '../specifications/HizbNumberSpecification';
import { OrSpecification } from '../specifications/OrSpecification';

export class QuestionController {
    public static generateQuestion(req: Request, res: Response): void {
        const questionType: string = (req.query.question_type as string) || QuestionType.PrefixNextAyah;

        const specifications: ISpecification<any>[] = [];

        // Handle multiple page ranges or specific pages
        if (req.query.pages) {
            const pageSpecs = (req.query.pages as string).split(',').map(range => {
                const [start, end] = range.split('-').map(Number);
                if (end !== undefined) {
                    return new PageRangeSpecification(start, end);
                } else {
                    return new PageRangeSpecification(start, start);
                }
            });

            // Combine page specifications using OrSpecification
            const combinedPageSpec = pageSpecs.reduce<ISpecification<any>>(
                (spec1, spec2) => new OrSpecification(spec1, spec2),
                pageSpecs[0]  // Start with the first specification as the initial value
            );
            specifications.push(combinedPageSpec);
        }

        // Handle multiple surah numbers
        if (req.query.surah_number) {
            const surahNumbers = (req.query.surah_number as string).split(',').map(Number);
            const surahSpecs = surahNumbers.map(num => new SurahNumberSpecification(num));

            // Combine surah specifications using OrSpecification
            const combinedSurahSpec = surahSpecs.reduce<ISpecification<any>>(
                (spec1, spec2) => new OrSpecification(spec1, spec2),
                surahSpecs[0]  // Start with the first specification as the initial value
            );
            specifications.push(combinedSurahSpec);
        }

        // Handle multiple juz numbers
        if (req.query.juz_number) {
            const juzNumbers = (req.query.juz_number as string).split(',').map(Number);
            const juzSpecs = juzNumbers.map(num => new JuzNumberSpecification(num));

            // Combine juz specifications using OrSpecification
            const combinedJuzSpec = juzSpecs.reduce<ISpecification<any>>(
                (spec1, spec2) => new OrSpecification(spec1, spec2),
                juzSpecs[0]  // Start with the first specification as the initial value
            );
            specifications.push(combinedJuzSpec);
        }

        // Handle multiple hizb numbers
        if (req.query.hizb_number) {
            const hizbNumbers = (req.query.hizb_number as string).split(',').map(Number);
            const hizbSpecs = hizbNumbers.map(num => new HizbNumberSpecification(num));

            // Combine hizb specifications using OrSpecification
            const combinedHizbSpec = hizbSpecs.reduce<ISpecification<any>>(
                (spec1, spec2) => new OrSpecification(spec1, spec2),
                hizbSpecs[0]  // Start with the first specification as the initial value
            );
            specifications.push(combinedHizbSpec);
        }

        // Combine all specifications using OrSpecification
        let combinedSpecification: ISpecification<any> | null = null;
        if (specifications.length > 0) {
            combinedSpecification = specifications.reduce<ISpecification<any>>(
                (spec1, spec2) => new OrSpecification(spec1, spec2),
                specifications[0]  // Start with the first specification as the initial value
            );
        }

        try {
            const generator = QuestionGeneratorFactory.createGenerator(questionType);
            const question = generator.generate(combinedSpecification!);
            res.json(question);
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ error: error.message });
            } else {
                res.status(400).json({ error: 'An unknown error occurred' });
            }
        }
    }
}
