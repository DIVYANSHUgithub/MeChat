import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();

const genToken=async (id)=>{
    try{
        const token=jwt.sign({ userId: id }, process.env.JWT_SECRET, {expiresIn:"10d"})
        return token
    } catch(error){
        console.log(`gen token error ${error}`)
    }
}

export default genToken