import { deleteOneUser, getOneUser, updateOneUser } from './usersServices';
import { Router , Request , Response } from "express";
import {AuthMiddlware, ValidateMiddleware}  from "../middlewares";
import {createNewUser, getAllUsers} from "../users/usersServices";
import usersCreateDto from './dtos/usersCreateDto'
import User from "./dtos/userDto";

const router = Router();

router.get("/" , AuthMiddlware , async (req : any , res : Response)=>{
    try{
        res.send(await getAllUsers());    
    }catch(err :any){
        res.status(500).send({message: err.message})
    }
});

router.get("/:id", async (req : Request , res : Response)=>{
    try{
        const id = req.params.id;
        res.send(await getOneUser(id))
    }catch(err :any){
        res.status(500).send({message: err.message})
    }
});

router.post("/",ValidateMiddleware(usersCreateDto) , async (req : Request , res : Response)=>{
    try{
        const body : User = req.body;
        res.send(await createNewUser(body))
    }catch(err :any){
        res.status(500).send({message: err.message})
    }
});

router.put("/:id", async (req : Request , res : Response)=>{
    try{
        const params = req.body;
        const id = req.params.id;
        res.send(await updateOneUser(id , params))
    }catch(err :any){
        res.status(500).send({message: err.message})
    }
});

router.delete("/:id", async (req : Request , res : Response)=>{
    try{
        const id = req.params.id;
        res.send(await deleteOneUser(id))
    }catch(err :any){
        res.status(500).send({message: err.message})
    }
});

export default router;