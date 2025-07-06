import express from "express"
import { Login, logOut, signUp } from "../controllers/auth.controller.js";

const authRouter = express.Router();  //Router function inside express


//post req is used when we take any data from client side
//POST--> client is sending data to server
authRouter.post("/signup",signUp)
authRouter.post("/signin",Login)
//here we have to clear the cookie se get req is used here
//GET-->client is requestion data from server side to clear cookie
authRouter.get("/logout",logOut)
export default authRouter;