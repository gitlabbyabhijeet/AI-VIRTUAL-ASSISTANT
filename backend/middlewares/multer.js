//This middleware isused to redirect the image coming from frontend to the filePath or public folder to upload it on cloudinary

//How to set image in backend coming from frontend


import multer from "multer"

const storage = multer.diskStorage({
    //file contains all things coming from frontend
    //cb-->callback
    destination:(req,file,cb)=>{
        //public -->this folder is used to store all the image coming from frontend
        cb(null,"./public")
    },
    //Giving name to the coming file
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    }
})

const upload = multer(storage)
export default upload;