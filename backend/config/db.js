//db.js file connects database

import mongoose from "mongoose"

//connecting database
const connectDb = async()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("db connectd");
    }catch(error){
        console.log("Error: ",error);
    }
}

export default connectDb;