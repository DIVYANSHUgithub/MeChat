import User from "../models/userModel.js";

import bcrypt from "bcryptjs";
import genToken from "../config/token.js";

//if we will export like this then we can import it like import {signUp, logIn, logOut} from "../controllers/authControllers.js"
export const signUp=async (req, res) => {
    try{
        const { userName, email, password } = req.body;
        const checkUserByUserName=await User.findOne({userName})
        const checkUserByEmail=await User.findOne({email})
        if(checkUserByUserName){
            return res.status(400).json({message:"UserName already exists"})
        }
        if(checkUserByEmail){
            return res.status(400).json({message:"Email already exists"})
        }

        if(password.length<6){
            return res.status(400).json({message:"Password must be atleast 6 characters"})
        }
         const hashedPassword=await bcrypt.hash(password, 12);

    const user=await User.create({userName, email, password:hashedPassword})

    const token=await genToken(user._id)

    res.cookie("token", token, {
        httpOnly:true,
        maxAge: 10 * 24 * 60 * 60 * 1000, //10 days
        sameSite:"none",
        secure:false
    })
    return res.status(201).json({message:"User created successfully", user, token})
    }catch(error){

        return res.status(500).json({message:"Internal server error", error:error.message})
    }
}

export const logIn=async (req, res) => {
    try{
        const {email, password } = req.body;
        const user=await User.findOne({email})
        if(!user){
            return res.status(404).json({message:"user not found"})
        }
        const isMatch=await bcrypt.compare(password, user.password)
        if(!isMatch){ 
            return res.status(400).json({message:"Invalid credentials"})
        }
    

        const token=await genToken(user._id)
        res.cookie("token", token, {
            httpOnly:true,
            maxAge: 10 * 24 * 60 * 60 * 1000, //10 days
            sameSite:"none",
            secure:false
        })
        return res.status(200).json({message:"Login successful", user, token})
    }catch(error){

        return res.status(500).json({message:"Login error", error:error.message})
    }
}


export const logOut=async (req, res) => {
    try{
        res.clearCookie("token")
        return res.status(200).json({message:"User logged out successfully"})
    }
    catch(error){
        return res.status(500).json({message:"Logout error", error:error.message})
    
    }
}