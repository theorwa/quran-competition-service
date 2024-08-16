import { ISpecification } from './ISpecification';
import { Ayah } from '../utils/CSVDataLoader';

export class AllAyahsSpecification implements ISpecification<Ayah> {
    public isSatisfiedBy(ayah: Ayah): boolean {
        return true;
    }
}
