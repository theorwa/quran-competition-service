import { ISpecification } from './ISpecification';
import {Ayah} from "../models/Ayah";

export class PageRangeSpecification implements ISpecification<Ayah> {
    constructor(private startPage: number, private endPage: number) {}

    isSatisfiedBy(ayah: Ayah): boolean {
        return ayah.pageNumber >= this.startPage && ayah.pageNumber <= this.endPage;
    }
}
