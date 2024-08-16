import { ISpecification } from './ISpecification';

export class OrSpecification<T> implements ISpecification<T> {
    constructor(private spec1: ISpecification<T>, private spec2: ISpecification<T>) {}

    isSatisfiedBy(item: T): boolean {
        return this.spec1.isSatisfiedBy(item) || this.spec2.isSatisfiedBy(item);
    }
}
