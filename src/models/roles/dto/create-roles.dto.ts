import { Expose, Transform } from "class-transformer";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateRoleDto {
    @Expose()
    @Transform(({ value }) =>
        typeof value === 'string' ? value.trim().toLowerCase() : value)
    @IsNotEmpty()
    @IsString()
    name!: string;

    deleteAt?: Date;

}