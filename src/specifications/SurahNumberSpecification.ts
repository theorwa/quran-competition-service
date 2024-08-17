import { ISpecification } from './ISpecification';
import {Ayah} from "../models/Ayah";

export class SurahNumberSpecification implements ISpecification<Ayah> {
    constructor(private surahNumber: number) {}

    isSatisfiedBy(ayah: Ayah): boolean {
        return ayah.surahNumber === this.surahNumber;
    }
}
