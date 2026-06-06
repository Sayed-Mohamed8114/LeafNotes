import dotenv from 'dotenv'; 
import jwt from 'jsonwebtoken';

dotenv.config(); 
const accessToken = process.env.ACCESS_TOKEN_SECRET; 

export default function authenticationToken(req,res,next){
    const authHead = req.header('authorization');
    const token  = authHead && authHead.split(" ")[1];
    if (!token) return res.sendStatus(401); // 401 Unauthorized
    jwt.verify(token,accessToken,(err,decoded)=>{
        if (err) return res.sendStatus(403); // 403 Forbidden , already exit but can't use it 
        req.user = decoded; 
        next();
    })
}