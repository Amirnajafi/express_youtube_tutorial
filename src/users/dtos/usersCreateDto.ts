import { IsDefined, IsOptional, MaxLength, MinLength } from "class-validator";

class CreateUserDto{
    @MaxLength(20)
    @IsDefined()
    name : string;
    @IsDefined()
    email : string;
    @IsDefined()
    @MinLength(8)
    password : string;
    @IsOptional()
    age : number;
}

export default CreateUserDto;