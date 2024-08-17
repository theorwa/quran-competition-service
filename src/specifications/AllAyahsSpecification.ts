import { ISpecification } from './ISpecification';
import {Ayah} from "../models/Ayah";

export class AllAyahsSpecification implements ISpecification<Ayah> {
    public isSatisfiedBy(ayah: Ayah): boolean {
        return true;
    }
}
