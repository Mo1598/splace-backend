import { ApiProperty } from "@nestjs/swagger";
import { IsAlphanumeric, IsEmail, IsNotEmpty, IsString, Length, Matches } from "class-validator";

export class CreateUser{
    @IsNotEmpty({message: 'Business name is required'})
    @IsString()
    @ApiProperty()
    username: string;

    @IsNotEmpty({message: 'Email is required'})
    @IsEmail()
    @ApiProperty()
    email: string;

    @IsNotEmpty({message: 'Password is required'})
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {message: "Weak password"})
    @ApiProperty()
    password: string;

    @IsNotEmpty({message: 'Phone number is required'})
    @Length(10,14)
    @ApiProperty()
    phonenumber: string;
}