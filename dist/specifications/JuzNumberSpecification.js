"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JuzNumberSpecification = void 0;
class JuzNumberSpecification {
    constructor(juzNumber) {
        this.juzNumber = juzNumber;
    }
    isSatisfiedBy(ayah) {
        return ayah.juzNumber === this.juzNumber;
    }
}
exports.JuzNumberSpecification = JuzNumberSpecification;
