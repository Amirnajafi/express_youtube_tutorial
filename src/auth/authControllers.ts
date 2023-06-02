import { register, login } from './authServices';
import { Router , Request , Response , NextFunction } from "express";
import registerDto from './dtos/registerDto';
import { ValidateMiddleware } from '../middlewares';
import LoginDto from './dtos/loginDto';


const router = Router();

router.post("/login" , ValidateMiddleware(LoginDto) ,  async (req : Request , res : Response , next : NextFunction)=>{
    try{
        const body : LoginDto = req.body;
        const result = await login(body)
        res.send(result)   
    }catch(err :any){
        next(err)
    }
});

router.post("/register",ValidateMiddleware(registerDto) , async (req : Request , res : Response , next : NextFunction)=>{
    try{
        const body : registerDto = req.body;
        const result = await register(body)
        res.send(result)
    }catch(err :any){
        next(err)
    }
});

export default router;