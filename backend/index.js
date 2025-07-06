// import express from "express";
// import dotenv from "dotenv";
// dotenv.config();
// import connectDb from "./config/db.js";
// import authRouter from "./routes/auth.routes.js";
// import cookieParser from "cookie-parser";
// import cors from "cors"
// import userRouter from "./routes/user.routes.js";

// // dotenv.config(); // Load variables from .env file

// const app = express();
// app.use(cors({
//     origin:"http://localhost:5173",  //from where frontend is coming
//     credentials:true
// }));
// //creating a middleware
// app.use(express.json());
// app.use(cookieParser());  //cookie parser
// app.use("/api/auth", authRouter);
// app.use("/api/user", userRouter);
// app.get("/", (req, res) => {
//     res.send("Hii");
// });

// const port = process.env.PORT || 3000;

// app.listen(port, () => {
//     connectDb();
//     console.log(`Server started on port ${port}`);
// });



// *********.env file 


// PORT=8080
// MONGODB_URL=mongodb+srv://bhartiabhijeet67:AbhijeetAtlas121314@cluster0.qddtip6.mongodb.net/virtualAssistant
// JWT_SECRET="SJDVHSKDJFFV"
// CLOUDINARY_CLOUD_NAME='dtd5ezwzf'
// CLOUDINARY_API_KEY='919146864168735'
// CLOUDINARY_API_SECRET='FbLlPCIOOAz7M5ltjgrmlMo-eUM'




// server.js
import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDb from "./config/db.js";
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import gemniResponse from "./gemini.js";

// Initialize express app
const app = express();

// Middlewares
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

// // Default route
// app.get("/",async (req, res) => {
//     let prompt = req.query.prompt
//     let data = await gemniResponse(prompt)
//     res.json(data)
// });
app.get("/", (req, res) => {
    res.send("Currently Server is running!");
});

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    connectDb();
    console.log(`Server started on port ${port}`);
});

