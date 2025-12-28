import UserModal from "../Modals/User-modal/userModal.js"
import bcrypt from "bcrypt"


 export const signUpUser = async (req, res) => {
 
     const data = req.body;
     
     
     


     console.log("************************user data", data);
     const password = data.password; // password without hashed
     const saltRounds = 20; // shuffling of password 
     
     const hashedPassword = await bcrypt.hash(password, saltRounds); // hashing......
 
     data.password = hashedPassword;  // replace old password in object with hashed password

     
     console.log("*****hashed password", data.password);
    


     await UserModal.create(data);

     
     

     res.json({
         message:"user data submited"
     })
     
}
