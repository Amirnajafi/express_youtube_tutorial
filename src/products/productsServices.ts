import ServerError from '../errors/serverError';
import productModel from '../models/produtsModel'
import GetAllProductDto from './dtos/getAllProductsDto';
import CreatePruductDto from './dtos/productsCreateDto';
export const getAllProducts = async (filters : GetAllProductDto) => {
    const {tags , start_price , end_price , page , page_size} = filters;
    let query = {};
    if (tags) {
        query["tags"] = {$in : [tags]}
    }
    if (start_price && end_price) {
        query["price"] = {$gte : start_price , $lte : end_price}
    }
    const result = await productModel.find(query , {} , {skip : page_size * (page - 1) , limit : page_size});
    return result
};

export const getOneProduct = async (id : string) => {
    const result = await productModel.findById(id);
    if (!result) {
        throw new ServerError(404 , "Product not found");
    }
    return result;
};

export const createNewProduct = async (data : CreatePruductDto) => {
    const result = await productModel.create(data);
    return result
};

export const updateProduct = async (id:string , data  : CreatePruductDto) => {
    const product  = await productModel.findOne({"_id" : id , user : data.user});
    if (!product) {
        throw new ServerError(404 , "Product not found");
    }
    // update product by dto 
    const result = await productModel.findByIdAndUpdate(id , {$set : data})
    return result;
};

export const deleteProduct = async (id : String , user : string) => {    
    const product  = await productModel.findOne({"_id" : id , user});
    if (!product) {
        throw new ServerError(404 , "Product not found");
    }
    const result  = await productModel.deleteOne({"_id" : id});
    return result 
};