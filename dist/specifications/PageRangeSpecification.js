"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageRangeSpecification = void 0;
class PageRangeSpecification {
    constructor(startPage, endPage) {
        this.startPage = startPage;
        this.endPage = endPage;
    }
    isSatisfiedBy(ayah) {
        return ayah.pageNumber >= this.startPage && ayah.pageNumber <= this.endPage;
    }
}
exports.PageRangeSpecification = PageRangeSpecification;
