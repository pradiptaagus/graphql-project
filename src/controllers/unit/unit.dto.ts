export interface CountUnitDTO {
    filter: string;
}

export interface UnitQueryDTO {
    filter: string;
    page: number;
    size: number;
}

export interface StoreUnitDTO {
    name: string;
}

export interface UpdateUnitDTO {
    name: string;
}