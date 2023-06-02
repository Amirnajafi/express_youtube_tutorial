import jwt from 'jsonwebtoken'
const SECRECT = "THIAISMYSECRET"

export const encodeToken = (payload : any) =>{
    const token = jwt.sign(payload , SECRECT , {expiresIn : "1h"})
    return token;
}

export const decodeToken = (token : string) =>{
    const decoded = jwt.verify(token , SECRECT)
    return decoded;
}