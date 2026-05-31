import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './database/db.js'; 
import bcrypt from 'bcrypt'; 
import User from './models/users.models.js';
import Note from './models/notes.models.js';
import authenticationToken from './utilites.js'; 
import jwt from 'jsonwebtoken';

dotenv.config();

const app = express(); 
app.use(express.json()); 

// frontend uri 
const allowedOrigin = ['http://localhost:5173'];
app.use(cors({
    origin:allowedOrigin,
    credentials:true,
}))

//routes  
// main route
app.get("/",(req,res)=>{
    res.json({data:"hello"});
})

// sign up 
app.post("create-account", async (req,res)=>{
    const [fullName,email,password] = req.body ; 
    if (!fullName || email || password) {
        return res.sendStatus(400).json({error:true, message:"All fields must be done please to create the account.."});
    }
    try{
        const isUser = await User.findOne({email});
        if(isUser){
            return res.sendStatus(409).json({error:true, message:"this user is already exit try to sign in instead"});
        }
        const hashedPassword = await bcrypt.hash(password,10);
        const newUser = new User({fullName,email,password:hashedPassword}) ;
        await newUser.save();

        const accessToken = jwt.sign({userId:user_id},process.env.ACCESS_TOKEN_SECRET,{
            expiresIn:"3600m",
        })

        return res.sendStatus(201).json({error:false,message:"account created successfully",accessToken});

    }catch(error){
        return res.sendStatus(500).json({error:true,message:"server error"});
    }  
})