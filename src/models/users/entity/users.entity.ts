import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Role } from "../../roles/entity/roles.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    name!: string;

    @Column({ unique: true })
    email!: string;

    @Column()
    password!: string;

    @CreateDateColumn()
    createAt!: Date;

    @UpdateDateColumn()
    udpdateAt!: Date;

    @DeleteDateColumn()
    deleteAt!: Date | null;

    @ManyToMany(() => Role, (role) => role.users, { eager: true })
    @JoinTable()
    roles!: Role[];
}