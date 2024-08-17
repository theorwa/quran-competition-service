export interface ICSVAyah {
    id: string;
    globalAyahNumber: string;
    surahNumber: string;
    surahName: string;
    surahAyahNumber: string;
    ayahText: string;
    pageNumber: string;
    pageAyatCount: string;
    firstAyahInPage: string;
    juzNumber: string;
    hizbNumber: string;
    rubNumber: string;
}

export interface IAyah {
    id: string;
    globalAyahNumber: number;
    surahNumber: number;
    surahName: string;
    surahAyahNumber: number;
    ayahText: string;
    pageNumber: number;
    pageAyatCount: number;
    firstAyahInPage: boolean;
    juzNumber: number;
    hizbNumber: number;
    rubNumber: number;
}

export class Ayah {
    id: string;
    globalAyahNumber: number;
    surahNumber: number;
    surahName: string;
    surahAyahNumber: number;
    ayahText: string;
    pageNumber: number;
    pageAyatCount: number;
    firstAyahInPage: boolean;
    juzNumber: number;
    hizbNumber: number;
    rubNumber: number;

    constructor(ayah: ICSVAyah) {
        this.id = ayah.id;
        this.globalAyahNumber = Number(ayah.globalAyahNumber);
        this.surahNumber = Number(ayah.surahNumber);
        this.surahName = ayah.surahName;
        this.surahAyahNumber = Number(ayah.surahAyahNumber);
        this.ayahText = ayah.ayahText;
        this.pageNumber = Number(ayah.pageNumber);
        this.pageAyatCount = Number(ayah.pageAyatCount);
        this.firstAyahInPage = ayah.firstAyahInPage === '1';
        this.juzNumber = Number(ayah.juzNumber);
        this.hizbNumber = Number(ayah.hizbNumber);
        this.rubNumber = Number(ayah.rubNumber);
    }

    getPrefix(wordLimit: number = 4): string {
        const words = this.getWords();
        return words.length > wordLimit ? words.slice(0, wordLimit).join(' ') + ' ...' : this.ayahText;
    }

    getSuffix(wordLimit: number = 4): string {
        const words = this.getWords();
        return words.length > wordLimit ? '... ' + words.slice(-wordLimit).join(' ') : this.ayahText;
    }

    getWords(): string[] {
        return this.ayahText.split(' ');
    }
}
