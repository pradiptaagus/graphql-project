import { Unit } from "../unit/unit.entity";

export interface CountProductDTO {
    filter: string;
}

export interface ProductQueryDTO {
    filter: string;
    page: number;
    size: number;
}

export interface StoreProductDTO {
    code: string;
    name: string;
    stock: number;
    unit: Unit;
}

export interface UpdateProductDTO {
    code: string;
    name: string;
    stock: number;
    unit: Unit;
}