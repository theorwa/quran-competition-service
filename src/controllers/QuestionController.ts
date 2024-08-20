import { Request, Response } from 'express';
import { QuestionGeneratorFactory } from '../generators/QuestionGeneratorFactory';
import { QuestionType } from '../models/QuestionType';
import { SpecificationFactory } from '../specifications/SpecificationFactory';
import { ISpecification } from '../specifications/ISpecification';
import { AllAyahsSpecification } from '../specifications/AllAyahsSpecification';  // This will be a new specification

export class QuestionController {
    public static generateQuestion(req: Request, res: Response): void {
        const questionType: string = (req.query.question_type as string) || QuestionType.random;
        const currentIndex: number = req.query.index ? Number(req.query.index) : -1;
        const startPage: number = req.query.start_page ? Number(req.query.start_page) : 1;
        const endPage: number = req.query.end_page ? Number(req.query.end_page) : 604;
        const pages: number[] = req.query.pages ? (req.query.pages as string).split(',').map(Number) : [];
        const surah: number = req.query.surah ? Number(req.query.surah) : -1;
        const juz: number = req.query.juz ? Number(req.query.juz) : -1;
        const hizb: number = req.query.hizb ? Number(req.query.hizb) : -1;

        const specifications: ISpecification<any>[] = [];

        // Create specifications for start_page and end_page
        const pageRangeSpec = SpecificationFactory.createPageRangeSpecification(req.query);
        if (pageRangeSpec) specifications.push(pageRangeSpec);

        // Create specifications for pages
        const pagesSpec = SpecificationFactory.createPagesSpecification(req.query);
        if (pagesSpec) specifications.push(pagesSpec);

        // Create specifications for other filters
        const surahSpec = SpecificationFactory.createSurahSpecification(req.query);
        if (surahSpec) specifications.push(surahSpec);

        const juzSpec = SpecificationFactory.createJuzSpecification(req.query);
        if (juzSpec) specifications.push(juzSpec);

        const hizbSpec = SpecificationFactory.createHizbSpecification(req.query);
        if (hizbSpec) specifications.push(hizbSpec);

        // Combine all specifications using OrSpecification
        let combinedSpecification = SpecificationFactory.combineSpecifications(specifications);

        // If no specifications provided, use a default specification to select all Ayahs
        if (!combinedSpecification) {
            combinedSpecification = new AllAyahsSpecification();
        }

        try {
            const generator = QuestionGeneratorFactory.createGenerator(questionType);
            const question = generator.generate(combinedSpecification, currentIndex);
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
