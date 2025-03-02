import { Expose, Transform } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString, Length, Matches, MaxLength } from "class-validator";

export class LoginUserDto {
    @Expose()
    @IsEmail()
    @IsNotEmpty()
    email!: string;

    @Expose()
    @IsString()
    @IsNotEmpty()
    password!: string;
}