import { ApiProperty } from "@nestjs/swagger";
import { IsAlphanumeric, IsNotEmpty, IsString } from "class-validator";

export class CreateUser{
    @IsNotEmpty({message: 'Business name is required'})
    @IsString()
    @ApiProperty()
    firstName: string;

    @IsNotEmpty({message: 'Business name is required'})
    @IsString()
    @ApiProperty()
    lastName: string;
}