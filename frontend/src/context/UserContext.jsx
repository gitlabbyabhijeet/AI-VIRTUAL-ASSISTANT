import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const userDataContext = createContext();

function UserContext({ children }) {
  const serverUrl = "http://localhost:8080";
  const [userData, setUserData] = useState(null);
    //input image
    const [frontendImage,setFrontendImage] = useState(null)  //it has that image which we saw inside the card
    const [backendImage,setBackendImage] = useState(null) //backendImage store that image which we store in backend
    const [selectedImage, setSelectedImage] = useState(null)

    //funtion to get response from Gemini
    const getGeminiResponse =async (command)=>{
      try {
        const result = await axios.post(`${serverUrl}/api/user/asktoassistant`,{command},{withCredentials:true})
        return result.data
      } catch (error) {
        console.log(error)
      }
    };

  useEffect(() => {
    const handleCurrentUser = async () => {
      try {
        const result = await axios.get(`${serverUrl}/api/user/current`, {
          withCredentials: true
        });

        if (!userData) {
          setUserData(result.data);
          console.log("User fetched and stored:", result.data);
        }
      } catch (error) {
        console.log("Error fetching current user:", error);
      }
    };

    
    handleCurrentUser();
  }, []);

  const value = { serverUrl, userData, setUserData ,backendImage,setBackendImage,frontendImage,setFrontendImage, selectedImage, setSelectedImage,getGeminiResponse};

  return (
    <userDataContext.Provider value={value}>
      {children}
    </userDataContext.Provider>
  );
}

export default UserContext; //  Required for Vite to resolve fast refresh




// import axios from 'axios'
// import React, { createContext, useEffect, useState } from 'react'
// export const userDataContext=createContext()
// function UserContext({children}) {
//     const serverUrl="http://localhost:8000"
//     const [userData,setUserData]=useState(null)
//     const [frontendImage,setFrontendImage]=useState(null)
//      const [backendImage,setBackendImage]=useState(null)
//      const [selectedImage,setSelectedImage]=useState(null)
//     const handleCurrentUser=async ()=>{
//         try {
//             const result=await axios.get(`${serverUrl}/api/user/current`,{withCredentials:true})
//             setUserData(result.data)
//             console.log(result.data)
//         } catch (error) {
//             console.log(error)
//         }
//     }

//     const getGeminiResponse=async (command)=>{
// try {
//   const result=await axios.post(`${serverUrl}/api/user/asktoassistant`,{command},{withCredentials:true})
//   return result.data
// } catch (error) {
//   console.log(error)
// }
//     }

//     useEffect(()=>{
// handleCurrentUser()
//     },[])
//     const value={
// serverUrl,userData,setUserData,backendImage,setBackendImage,frontendImage,setFrontendImage,selectedImage,setSelectedImage,getGeminiResponse
//     }
//   return (
//     <div>
//     <userDataContext.Provider value={value}>
//       {children}
//       </userDataContext.Provider>
//     </div>
//   )
// }

// export default UserContext
