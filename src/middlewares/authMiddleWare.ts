import usersModel from '../models/usersModel';
import RequestWithUser from '../types/RequestWithUser';
import { decodeToken } from './../utils/index';
import { Request, Response, NextFunction } from "express";

const AuthMiddlware = async (req : RequestWithUser , res : Response , next : NextFunction)=>{
    let token  = req.headers.authorization;
    if (!token) return res.status(401).send({message : "Unauthorized"})
    token = token.split(" ")[1];
    try{
        const data : any = decodeToken(token);
        req.user = data.id;
        next();
    }catch(err : any){
        res.status(401).send({message : "Unauthorized"})
    }
    
}

export default AuthMiddlware;