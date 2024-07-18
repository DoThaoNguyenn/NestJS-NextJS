import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class LoginUserDto{
    @ApiProperty({
        description: "email login",
        example: "nguyen@gmail.com"
    })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty()
    @IsNotEmpty()
    password: string
}