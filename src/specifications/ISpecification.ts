export interface ISpecification<T> {
    isSatisfiedBy(item: T): boolean;
}
