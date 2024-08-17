import { ISpecification } from './ISpecification';
import {Ayah} from "../models/Ayah";

export class JuzNumberSpecification implements ISpecification<Ayah> {
    constructor(private juzNumber: number) {}

    isSatisfiedBy(ayah: Ayah): boolean {
        return ayah.juzNumber === this.juzNumber;
    }
}
