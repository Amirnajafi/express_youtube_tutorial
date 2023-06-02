import { IsDefined, IsOptional, MaxLength, MinLength } from "class-validator";

class CreatePruductDto{
    @MaxLength(20)
    @IsDefined()
    title : string;
    @IsDefined()
    description : string;
    @IsDefined()
    price : number;
    @IsOptional()
    tags : string[];
    @IsOptional()
    user : string
}

export default CreatePruductDto;