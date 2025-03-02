import { Role } from "../../roles/entity/roles.entity";

export class CreateUserDto {
    name!: string;
    email!: string;
    password!: string;
    createAt!: Date;
    updateAt?: Date;
    deleteAt?: Date;
    roles!: Role[];

  

}