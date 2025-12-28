import UserModal from "../Modals/User-modal/userModal.js"
import bcrypt from "bcrypt"


 export const signUpUser = async (req, res) => {
 
     const data = req.body;

     console.log("************************user data", data);
     const password = data.password; // password without hashed
     const saltRounds = 12; // shuffling of password / roind of suffleing more time more secure
     
     const hashedPassword = await bcrypt.hash(password, saltRounds); // hashing......
 
     data.password = hashedPassword;  // replace old password in object with hashed password
     
     console.log("*****hashed password", data.password);

     await UserModal.create(data);

     res.json({
         message:"user data submited"
     })
     
}

export const SignInUser = async (req, res) => {
    try {
        const data = req.body;
      const { email, password } = req.body;
        console.log(data);
        const registerUser = await UserModal.findOne({ email: email }); // checking the email existing in DB vs email entered by user
        
        if (!registerUser || registerUser.length === 0) {
            return res.status(404).json({
                success: false,
                message:"user not found"
          })
        }
        
        const isMatched = await bcrypt.compare(password, registerUser?.password);
        //checking existing password (registeredUser) in Db vs pass entered by user while logged


        if (!isMatched) {
            return res.status(401).json({
                success: false,
                message: "password incorrect"
            })
        }


        console.log("**********registered user", registerUser);
      
      
    
    res.status(202).json({
      success: true,
      message: "User registered successfully",
    });
  } catch (error) {
      res.status(500).json({ message: "Server error" });
      console.log(error);
      
  }
};
