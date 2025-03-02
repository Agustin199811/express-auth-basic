import { Expose, Transform } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString, Length, Matches, MaxLength } from "class-validator";

export class RegisterUserDto {

    @Expose()
    @Transform(({ value }) =>
        typeof value === 'string' ? value.trim() : value)
    @IsString()
    @IsNotEmpty()
    @Length(6, 12)
    name!: string;

    @Expose()
    @IsEmail()
    @IsNotEmpty()
    email!: string;

    @Expose()
    @Transform(({ value }) =>
        typeof value === 'string' ? value.trim() : value)
    @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d_!@#$%^&*]+$/, {
        message: 'Password must contain both letters and numbers, and can include special characters like _!@#$%^&*',
    })
    @IsString()
    @IsNotEmpty()
    @Length(6, 8)
    password!: string;
}