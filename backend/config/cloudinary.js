//----------------->>>>>>>Cloudinary is a cloud-based media 
// management platform that provides powerful
//  tools to upload, store, manipulate, optimize, and deliver images and videos for websites and applications.

import { v2 as cloudinary } from 'cloudinary';
import fs from "fs" 


const uploadOnCloudinary = async (filePath) => {
    // Configuration
    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
    });

    try {
        // Upload an image
     const uploadResult = await cloudinary.uploader
       .upload(filePath)
       fs.unlinkSync(filePath) //It delete the image on following path
       return uploadResult.secure_url
    } catch (error) {
         fs.unlinkSync(filePath) //Deleting Image
         return resizeBy.status(500).json({message:"cloudinary error"})
    }
}

export default uploadOnCloudinary