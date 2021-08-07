import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Unit } from "../unit/unit.entity";

@Entity()
export class Product {
    @PrimaryGeneratedColumn("uuid")
    id!: string;
    
    @Column({type: "varchar", nullable: false})
    code!: string;

    @Column({type: "varchar", nullable: false})
    name!: string;

    @Column({type: "int"})
    stock!: number;

    @ManyToOne(() => Unit, unit => unit.products)
    unit!: Unit;
}