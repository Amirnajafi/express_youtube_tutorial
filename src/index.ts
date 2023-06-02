import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import logger from './helper/logger';

// controllers
import {usersControllers} from './users';
import {productControllers} from './products';
import {authControllers} from './auth';
import { ErrorHandelingMid } from './middlewares';

// express app 
const app  = express();

// middlewares
app.use(cors());
app.use(express.json());

// routes group 
app.use("/users" ,usersControllers);
app.use("/products" ,productControllers);
app.use("/auth" ,authControllers);


app.use(ErrorHandelingMid)

// server start

mongoose.connect("mongodb://admin:Rr42728292@localhost:27017/express?authSource=admin" , {}).then(()=>{
    app.listen(3000 , ()=>{
        logger.warn("express server is out of date")
        logger.info('Server is running on port 3000');
    })
}).catch((err)=>{
    logger.error("error" , err)
})



// socket.io 
// import express  , {Request , Response} from 'express';
// import http from 'http'
// import {Server , Socket} from 'socket.io'

// const app  = express();
// const server  = http.createServer(app)
// const io  = new Server(server , {
//     cors  : {
//         origin : "*"
//     }
// })

// io.on("connection" , (socket : Socket)=>{
//     console.log(socket.id)

//     socket.on("sendMessage" , (data : any )=>{
//         const {message , user , room}  = data
//         io.to(room).emit("message" , {message , user})
//     })
    

//     socket.on("join" , (data)=>{
//         const {room}  = data
//         console.log(room)
//         socket.join(room)
//     })

//     socket.on("leave" , (data)=>{
//         const {room}  = data
//         socket.leave(room)
//     })


//     socket.on("disconnect" , ()=>{
//         console.log("user disconnected")
//     })
// })


// const PORT = 3000;
// server.listen(PORT , ()=>{
//     console.log("server is running on port wit socket 3000")
// })