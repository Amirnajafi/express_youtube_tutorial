import { plainToClass, plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { NextFunction, Request, Response } from "express";
import ClientError from "../errors/clientError";

const ValidateMiddleware = (validationSchema : any) => {
    return (req : Request , res : Response , next : NextFunction)=>{
        const body = req.body;
        const clientError = new ClientError()
        const validationClass = plainToInstance(validationSchema , body);
        validate(validationClass , {}).then((errors)=>{
            if(errors.length > 0){
                clientError.data = [];
                clientError.errors = errors.map((error : any)=>{
                    return {[error.property] : Object.values(error.constraints)}
                });
                res.status(400).send(clientError);
            }else{
                next()
            }
        })
        
    }
};

export default ValidateMiddleware;