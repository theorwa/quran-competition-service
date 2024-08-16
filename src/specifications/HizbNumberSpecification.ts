import { ISpecification } from './ISpecification';
import { Ayah } from '../utils/CSVDataLoader';

export class HizbNumberSpecification implements ISpecification<Ayah> {
    constructor(private hizbNumber: number) {}

    isSatisfiedBy(ayah: Ayah): boolean {
        return ayah.hizbNumber === this.hizbNumber;
    }
}
