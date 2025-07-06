// import jwt from "jsonwebtoken";


// const getToken = async (userId) =>{
//     try{
//         //Generating our Token using json web token
//         const token = await jwt.sign({userId},process.env.JWT_SECRET,{expiresIn:"10d"});
//         return token;
//     }catch(error){
//         console.log("error",error)
//     }

// }

// export default getToken;



// import jwt from "jsonwebtoken";

// const getToken = (userId) => {
//   try {
//     // Generating our Token using JSON Web Token
//     const token = jwt.sign({ userId },
//        process.env.JWT_SECRET, {
//       expiresIn: "10d",
//     });
//     return token;
//   } catch (error) {
//     console.log("JWT Error:", error);
//   }
// };

// export default getToken;



import jwt from "jsonwebtoken";

const getToken =async (userId) => {
  try {
    console.log("Signing token with secret:", process.env.JWT_SECRET); // 🔍

    const token = await jwt.sign(
      { userId },
      process.env.JWT_SECRET, // <- Confirm this logs "SJDVHSKDJFFV"
      { expiresIn: "10d" }
    );

    return token;
  } catch (error) {
    console.log("JWT Error:", error);
  }
};

export default getToken;
