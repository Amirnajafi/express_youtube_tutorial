import { Request, Response } from "express";
import User from "./dtos/userDto";
import usersModel from "../models/usersModel";

export const getAllUsers = () => {
    return new Promise((resolve , reject)=>{
        usersModel.find().then((users)=>{
            resolve(users)
        }).catch((err)=>{
            reject(err)
        })
    })
};

export const getOneUser = (id : string) => {
    return new Promise((resolve , reject)=>{
        usersModel.findOne({_id: id}).then((user)=>{
            resolve(user)
        }).catch((err)=>{
            reject(err)
        })
    })
}

export const updateOneUser = (id : string , params : User) => {
    return new Promise((resolve , reject)=>{
        usersModel.findByIdAndUpdate(id , params).then((user)=>{
            resolve(user)
        }).catch((err)=>{
            reject(err)
        })
    })
}

export const deleteOneUser = (id : string) => {
    return new Promise((resolve , reject)=>{
        usersModel.findByIdAndDelete(id).then((user)=>{
            resolve(user)
        }).catch((err)=>{
            reject(err)
        })
    })
}


export const createNewUser = (user : User) => {
    return new Promise((resolve , reject)=>{
        usersModel.create(user).then((user)=>{
            resolve(user)
        }).catch((err)=>{
            reject(err)
        })
    })
    
}