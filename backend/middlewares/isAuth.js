// //authenication middleware to get information of current user



// import jwt from "jsonwebtoken";
// import dotenv from 'dotenv';
// dotenv.config();

// const isAuth = async (req, res, next) => {
//   try {
//     const token = req.cookies.token;
//     console.log("Token from cookie:", token);
//     console.log("JWT_SECRET:", process.env.JWT_SECRET);

//     if (!token) {
//       return res.status(401).json({ message: "Unauthorized: No token" });
//     }

//     const verifyToken = jwt.verify(token, process.env.JWT_SECRET); // No need to await
//     req.userId = verifyToken.userId;
//     next();
//   } catch (error) {
//     console.log("JWT verification error:", error.message);
//     return res.status(403).json({ message: "Unauthorized: Invalid token" });
//   }
// };

// export default isAuth;



import jwt from "jsonwebtoken"
const isAuth=async (req,res,next)=>{
    try {
        const token=req.cookies.token
        if(!token){
            return res.status(400).json({message:"token not found"})
        }
        const verifyToken=await jwt.verify(token,process.env.JWT_SECRET)
        req.userId=verifyToken.userId

        next()

    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"is Auth error"})
    }
}

export default isAuth