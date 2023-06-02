import { Router , Request , Response , NextFunction } from "express";
import {AuthMiddlware}  from "../middlewares";
import {getAllProducts , createNewProduct , updateProduct , deleteProduct , getOneProduct} from "./productsServices";
import CreatePruductDto from "./dtos/productsCreateDto";
import GetAllProductDto from "./dtos/getAllProductsDto";

import RequestWithUser from "../types/RequestWithUser";
const router = Router();

router.get("/" , async (req : Request , res : Response , next : NextFunction)=>{
    try {
        const filters : any = req.query;
        const result = await getAllProducts(filters);
        res.status(200).json(result);
    } catch (error) {
        next(error)
    }
});

router.get("/:id", async (req : Request , res : Response, next : NextFunction)=>{
    try {
        const id : string = req.params.id;
        const result = await getOneProduct(id);
        res.status(200).json(result);
    } catch (error) {
        next(error)
    }
});

router.post("/",AuthMiddlware, async (req : RequestWithUser , res : Response, next : NextFunction)=>{
    try {
        const data : CreatePruductDto = req.body; 
        const result = await createNewProduct({...data , user : req.user});
        res.status(200).json(result);
    } catch (error) {
        next(error)
    }
});

router.put("/:id",AuthMiddlware, async (req : RequestWithUser , res : Response, next : NextFunction)=>{
    try {
        const data : CreatePruductDto = req.body; 
        const id : string = req.params.id;
        const result = await updateProduct(id , {...data , user : req.user});
        res.status(200).json(result);
    } catch (error) {
        next(error)
    }

});

router.delete("/:id",AuthMiddlware, async (req : RequestWithUser , res : Response, next : NextFunction)=>{
    try {
        const id : string = req.params.id;
        const result = await deleteProduct(id  , req.user);
        res.status(200).json(result);
    } catch (error) {
        next(error)
    }
});

export default router;