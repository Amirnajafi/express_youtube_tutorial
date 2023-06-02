import mongoose from 'mongoose'

const userScheema = new mongoose.Schema({
    name : String,
    email : String,
    password : String,
    age : {
        type : Number,
        default : 0
    },
})


export default mongoose.model("users" , userScheema)