import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "../product/product.entity";

@Entity()
export class Unit {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({type: "varchar", nullable: false})
    name!: string;

    @OneToMany(() => Product, product => product.unit)
    products!: Product;
}