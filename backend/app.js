import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './database/db.js'; 

dotenv.config();

const app = express(); 


//middlewares
app.use(cors());
app.use(express.json); 

//database  
connectDB(); 

// home route 
app.get("/",(req,res)=>{
    res.send("server is running ")
})

// start server
const port = process.env.PORT || 5000 ; 
app.listen(port , ()=> console.log(`server is running on port : ${port}`) )