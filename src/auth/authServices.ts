import { encodeToken, decodeToken } from './../utils/index';
import usersModel from "../models/usersModel";
import LoginDto from "./dtos/loginDto";
import registerDto from "./dtos/registerDto";
import bcrypt from "bcrypt";
import ServerError from '../errors/serverError';


export const register = async (data : registerDto) =>{
    const user = await usersModel.findOne({email : data.email})
    if (user) throw new ServerError(409 , "User already exists")
    const hashedPassword = await bcrypt.hash(data.password , 10)
    const newUser = await usersModel.create({...data , password : hashedPassword})
    newUser.save()
    return newUser
}


export const login = async  (data : LoginDto) =>{
    const user = await usersModel.findOne({email : data.email})
    if (!user) throw new ServerError(404 , "User not found")
    const compare = await bcrypt.compare(data.password , `${user.password}`)
    if (!compare) throw new ServerError(400 , "Invalid credentials")
    const token = encodeToken({id : user._id})
    return {token : `${token}`}
}