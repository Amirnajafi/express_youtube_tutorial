import mongoose from 'mongoose'

const productScheema = new mongoose.Schema({
    title : String,
    description : String,
    price : Number,
    careteAt : {
        type : Date,
        default : Date.now
    },
    updateAt : {
        type : Date,
        default : Date.now
    },
    tags : {
        type : [String],
        default : []
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "users",
        required : true
    }
})

export default mongoose.model("products" , productScheema)