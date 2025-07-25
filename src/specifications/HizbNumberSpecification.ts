import { ISpecification } from './ISpecification';
import {Ayah} from "../models/Ayah";

export class HizbNumberSpecification implements ISpecification<Ayah> {
    constructor(private hizbNumber: number) {}

    isSatisfiedBy(ayah: Ayah): boolean {
        return ayah.hizbNumber === this.hizbNumber;
    }
}
