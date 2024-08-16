"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HizbNumberSpecification = void 0;
class HizbNumberSpecification {
    constructor(hizbNumber) {
        this.hizbNumber = hizbNumber;
    }
    isSatisfiedBy(ayah) {
        return ayah.hizbNumber === this.hizbNumber;
    }
}
exports.HizbNumberSpecification = HizbNumberSpecification;
