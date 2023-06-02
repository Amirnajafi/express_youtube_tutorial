import { IsDefined, IsEmail, IsOptional, MaxLength, MinLength } from "class-validator";

export default class registerDto{
    @MaxLength(20)
    @IsDefined()
    name : string;
    @IsDefined()
    @IsEmail()
    email : string;
    @IsDefined()
    @MinLength(8)
    password : string;
}
