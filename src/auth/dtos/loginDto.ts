import { IsDefined, IsOptional, MaxLength, MinLength } from "class-validator";

export default class LoginDto{
    @IsDefined()
    email : string;
    @IsDefined()
    @MinLength(8)
    password : string;
}
