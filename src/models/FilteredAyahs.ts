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

    public getAyahs(): Ayah[] {
        return this.ayahs;
    }

    public getAyahsLength(): number {
        return this.ayahsCount;
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

    public getWords(): string[] {
        return this.ayahs.flatMap(ayah => ayah.getWords());
    }

    public getNextAyah(randomIndex: number): number {
        return (randomIndex + 1) % this.ayahsCount;
    }

    public getPreviousAyah(randomIndex: number): number {
        return (randomIndex - 1 + this.ayahsCount) % this.ayahsCount;
    }

    public getNextAyahs(randomIndex: number, count: number): Ayah[] {
        const nextAyahs = [];
        for (let i = 1; i <= count; i++) {
            nextAyahs.push(this.ayahs[this.getNextAyah(randomIndex + i)]);
        }
        return nextAyahs;
    }

    public getPreviousAyahs(randomIndex: number, count: number): Ayah[] {
        const previousAyahs = [];
        for (let i = 1; i <= count; i++) {
            previousAyahs.push(this.ayahs[this.getPreviousAyah(randomIndex - i)]);
        }
        return previousAyahs;
    }

    public getNextUniqueAyaPrefixes(randomIndex: number, count: number): string[] {
        const uniqueAyaPrefixes: string[] = [];
        let currentIndex = randomIndex;
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




}