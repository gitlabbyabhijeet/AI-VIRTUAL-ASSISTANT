//This file the current information of the user

import User from "../models/user.models.js";
import uploadOnCloudinary from "../config/cloudinary.js"
import gemniResponse from "../gemini.js";
import { response } from "express";
import moment from "moment/moment.js";

export const getCurrentUser = async (req, res) => {
  try {
    const userId = req.userId;
    console.log("✅ Reached /api/user/current");
   console.log("User ID from token:", req.userId);
    console.log("Requested userId:", userId);
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.log("getCurrentUser error:", error);
    return res.status(500).json({ message: "get current user error" });
  }
};


//updating Assistant
  //1-->Assistant Name
  //2-->Assistant Image

export const updateAssistant = async(req,res)=>{
  //updating user
  try {
    //for seven Image is user select any image from this seven image
    const {assistantName, imageUrl} = req.body
    let assistantImage;

    if(req.file){
      //if image is taken by the user-->input image
      assistantImage = await uploadOnCloudinary(req.file.path)
    }else{
      assistantImage = imageUrl
    }

    //updating this image and imageName to the current user
    const user = await User.findByIdAndUpdate(req.userId,{
      assistantName,assistantImage
    },{new:true}).select("-password")
    return res.status(200).json(user)
  } catch (error) {
      return res.status(500).json({ message: "update Assistant Error" });
  }
}

//controller for gemini prompt

export const askToAssistant = async (req,res)=>{
  try {
    //command from client-side
     const {command} = req.body
     const user = await User.findById(req.userId);
     const userName = user.name;
     const assistantName = user.assistantName;
     const result = await gemniResponse(command,assistantName,userName)

     const jsonMatch = result.match(/{[\s\S]*}/)
     if(!jsonMatch){
      return res.status(400).json({response:"sorry, i can't understand"})
     }
     const gemResult = JSON.parse(jsonMatch[0])
     const type = gemResult.type

     switch(type){
      case 'get-date' : 
         return res.json({
          type,
          userInput : gemResult.userInput,
          response : `current date is ${moment().format('YYYY-MM-DD')}`
         });

      case 'get-time':
        return res.json({
          type,
          userInput: gemResult.userInput,
          response: `Current time is ${moment().format('hh:mm A')}`
        });

      case 'get-day':
        return res.json({
          type,
          userInput: gemResult.userInput,
          response: `today is ${moment().format('dddd')}`
        });
        
      case 'get-month':
        return res.json({
          type,
          userInput: gemResult.userInput,
          response: `Current month is ${moment().format('MMMM')}`
        });

      case 'google-search':  
      case 'youtube-search':  
      case 'youtube-play':  
      case 'general':  
      case 'calculator-open':  
      case 'instagram-open':  
      case 'facebook-open':  
      case 'weather-show':  
         return res.json({
           type,
           userInput:gemResult.userInput,
           response:gemResult.response,
         }); 

         default:
          return res.status(400).json({
            response:"Hmm... Im not sure how to help with that. Try asking something else!"
          })
     }

  } catch (error) {
    console.error("Assistant error:", error); 
    return res.status(500).json({response: "Internal error occurred" })
  }
}