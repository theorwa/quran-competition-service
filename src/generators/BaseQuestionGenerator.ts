import { QuestionGenerator } from './QuestionGenerator';
import { Ayah } from '../utils/CSVDataLoader';

export abstract class BaseQuestionGenerator extends QuestionGenerator {

    protected shuffleArray(array: any[]): any[] {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    protected getRandomOptions(allAyahs: Ayah[], exclude: Ayah[], count: number): Ayah[] {
        const availableAyahs = allAyahs.filter((a) => !exclude.includes(a));
        const randomOptions = [];

        while (randomOptions.length < count && availableAyahs.length > 0) {
            const randomIndex = Math.floor(Math.random() * availableAyahs.length);
            randomOptions.push(availableAyahs.splice(randomIndex, 1)[0]);
        }

        return randomOptions;
    }

    protected expandPageRange(startPage: number, endPage: number, minAyahs: number): Ayah[] {
        let ayahs = this.dataLoader.getDataByPageRange(startPage, endPage);

        while (ayahs.length < minAyahs && (startPage > 1 || endPage < 604)) {
            if (startPage > 1) startPage--;
            if (endPage < 604) endPage++;
            ayahs = this.dataLoader.getDataByPageRange(startPage, endPage);
        }

        return ayahs;
    }
}
