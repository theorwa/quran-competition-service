import {Ayah} from "./Ayah";

export class FilteredAyahs {
    private readonly ayahs: Ayah[];
    private readonly ayahsCount: number;
    private readonly wordsCount: number;

    constructor(ayahs: Ayah[]) {
        this.ayahs = ayahs;
        this.ayahsCount = ayahs.length;
        this.wordsCount = this.getWords().length;
    }

    public getAyahByIndex(index: number): Ayah {
        return this.ayahs[this.getAyahIndex(index)];
    }

    private getRandomAyahIndex(): number {
        return Math.floor(Math.random() * this.ayahsCount);
    }

    public getAyahIndex(index: number): number {
        return index >= 0 && index < this.ayahsCount ? index : this.getRandomAyahIndex();
    }

    public getNextAyah(randomIndex: number): number {
        return (randomIndex + 1) % this.ayahsCount;
    }

    public getPreviousAyah(randomIndex: number): number {
        return (randomIndex - 1 + this.ayahsCount) % this.ayahsCount;
    }

    public getNextUniqueAyaPrefixes(index: number, count: number): string[] {
        const uniqueAyaPrefixes: string[] = [];
        let currentIndex = index;
        while (uniqueAyaPrefixes.length < count) {
            const nextIndex = this.getNextAyah(currentIndex);
            if (!uniqueAyaPrefixes.includes(this.ayahs[nextIndex].getPrefix())) {
                uniqueAyaPrefixes.push(this.ayahs[nextIndex].getPrefix());
            }
            currentIndex = nextIndex;
        }
        return uniqueAyaPrefixes;
    }

    public getPreviousUniqueAyaPrefixes(randomIndex: number, count: number): string[] {
        const uniqueAyaPrefixes: string[] = [];
        let currentIndex = randomIndex;
        while (uniqueAyaPrefixes.length < count) {
            const previousIndex = this.getPreviousAyah(currentIndex);
            if (!uniqueAyaPrefixes.includes(this.ayahs[previousIndex].getPrefix())) {
                uniqueAyaPrefixes.push(this.ayahs[previousIndex].getPrefix());
            }
            currentIndex = previousIndex;
        }
        return uniqueAyaPrefixes;
    }

    public getNextUniqueAyaSuffixes(randomIndex: number, count: number): string[] {
        const uniqueAyaSuffixes: string[] = [];
        let currentIndex = randomIndex;
        while (uniqueAyaSuffixes.length < count) {
            const nextIndex = this.getNextAyah(currentIndex);
            if (!uniqueAyaSuffixes.includes(this.ayahs[nextIndex].getSuffix())) {
                uniqueAyaSuffixes.push(this.ayahs[nextIndex].getSuffix());
            }
            currentIndex = nextIndex;
        }
        return uniqueAyaSuffixes;
    }

    public getPreviousUniqueAyaSuffixes(randomIndex: number, count: number): string[] {
        const uniqueAyaSuffixes: string[] = [];
        let currentIndex = randomIndex;
        while (uniqueAyaSuffixes.length < count) {
            const previousIndex = this.getPreviousAyah(currentIndex);
            if (!uniqueAyaSuffixes.includes(this.ayahs[previousIndex].getSuffix())) {
                uniqueAyaSuffixes.push(this.ayahs[previousIndex].getSuffix());
            }
            currentIndex = previousIndex;
        }
        return uniqueAyaSuffixes;
    }

    public getWords(): string[] {
        return this.ayahs.flatMap(ayah => ayah.getWords());
    }

    public getWordIndex(index: number): number {
        return index >= 0 && index < this.wordsCount ? index : Math.floor(Math.random() * this.wordsCount);
    }

    public getWordByIndex(index: number): string {
        return this.getWords()[this.getWordIndex(index)];
    }

    public getNextWordIndex(currentIndex: number): number {
        return (currentIndex + 1) % this.wordsCount;
    }

    public getNextUniqueWords(randomIndex: number, count: number): string[] {
        const uniqueWords: string[] = [];
        let currentIndex = randomIndex;
        while (uniqueWords.length < count) {
            const nextIndex = this.getNextWordIndex(currentIndex);
            if (!uniqueWords.includes(this.getWordByIndex(nextIndex))) {
                uniqueWords.push(this.getWordByIndex(nextIndex));
            }
            currentIndex = nextIndex;
        }
        return uniqueWords;
    }

    public getAyahByWordIndex(index: number): Ayah {
        let wordIndex = 0;
        for (const ayah of this.ayahs) {
            const words = ayah.getWords();
            if (index >= wordIndex && index < wordIndex + words.length) {
                return ayah;
            }
            wordIndex += words.length;
        }
        return this.ayahs[this.getRandomAyahIndex()];
    }


}