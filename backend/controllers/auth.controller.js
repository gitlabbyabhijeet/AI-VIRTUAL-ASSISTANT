//It contains files (like auth.controller.js) that handle the logic behind API endpoints — such as user registration, login, booking actions, etc.

import User from "../models/user.models.js";
import bcrypt from "bcryptjs";
import getToken from "./token.js";



export const signUp = async (req,res)=>{
    try{
        const {name,email,password}=req.body;   //for signUp we take name, eamil and password of the user from req.body
        //checking existing user of the same email or checking is same user try to signUp by using same email
        const existEmail = await User.findOne({email})
        if(existEmail){
            return res.status(400).json(
                {
                    message:"Email Already Exists"
                }
            )
        }
        //checking password length that must be grater or equal to six char
        if(password.length<6){
            return res.status(400).json({message:"password must be at least 6 character!"})
        }

        //Now SignUp process start
        const hashedPassword = await bcrypt.hash(password,10); //10 represent salt round

        //now creating user
        const user = await User.create({
            name,
            password:hashedPassword,
            email
        });
        //Generating Token for user 
        const token =  getToken(user._id)
        res.cookie("token",token,{
            httpOnly:true,
            secure:false,
            sameSite:"strict",
            path:"/",
            //passing 7days in millidays
            maxAge:7*24*60*60*1000,  //life of cookie
            
            
        })
        return res.status(201).json(user)
    }catch(error){
        console.error("Signup error:", error); 
        return res.status(500).json({message: `Signup error`, error: error.message })
    }
}


// ==========================
// User Login Controller
// ==========================

export const Login = async (req,res)=>{
    try{
        const {email,password}=req.body;   //for signUp we take name, eamil and password of the user from req.body
        //checking existing user of the same email or checking is same user try to signUp by using same email
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json(
                {
                    message:"email does not exists!"
                }
            )
        }
        //checking the password is correct or not by comparing user entered password and hashed password
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({message:"incorrect password"})
        }
        //Generating Token for user 
        const token = await getToken(user._id)
        res.cookie("token",token,{
            httpOnly:true,
            //passing 7days in millidays
            maxAge:7*24*60*60*1000,  //life of cookie
            sameSite:"strict",
            secure:false , // should be true in production (HTTPS)
            path: "/"
        })
        return res.status(200).json(user)
    }catch(error){
        return res.status(500).json({message:`login error`})
    }
}

// ==========================
// User Logout Controller
// ==========================


//jb tk token cookie me rhega tb tk user login rhega aur jb cookie se token ko remove krwa denge tb user logout ho jyega
export const logOut = async (req,res)=>{
    try{
        res.clearCookie("token");
        return res.status(200).json({message:"logout successfully"})
    }catch(error){
        return res.status(500).json({message:`logout error ${error}`})
    }
}






