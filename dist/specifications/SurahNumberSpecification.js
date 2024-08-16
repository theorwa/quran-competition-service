"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SurahNumberSpecification = void 0;
class SurahNumberSpecification {
    constructor(surahNumber) {
        this.surahNumber = surahNumber;
    }
    isSatisfiedBy(ayah) {
        return ayah.surahNumber === this.surahNumber;
    }
}
exports.SurahNumberSpecification = SurahNumberSpecification;
