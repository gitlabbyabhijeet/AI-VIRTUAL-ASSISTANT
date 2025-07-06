import express from "express"
import {askToAssistant, getCurrentUser, updateAssistant } from "../controllers/user.controller.js";
import isAuth from "../middlewares/isAuth.js";
import upload from "../middlewares/multer.js";


const userRouter = express.Router();  //Router function inside express
//here we have to clear the cookie se get req is used here
//GET-->client is requestion data from server side to clear cookie
userRouter.get("/current", isAuth , getCurrentUser)
userRouter.post("/update", isAuth ,upload.single("assistantImage"), updateAssistant)
userRouter.post("/asktoassistant",isAuth,askToAssistant)
export default userRouter;
