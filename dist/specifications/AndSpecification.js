"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AndSpecification = void 0;
class AndSpecification {
    constructor(spec1, spec2) {
        this.spec1 = spec1;
        this.spec2 = spec2;
    }
    isSatisfiedBy(item) {
        return this.spec1.isSatisfiedBy(item) && this.spec2.isSatisfiedBy(item);
    }
}
exports.AndSpecification = AndSpecification;
