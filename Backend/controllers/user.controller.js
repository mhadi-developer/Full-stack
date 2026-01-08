import UserModal from "../Modals/User-modal/userModal.js"
import bcrypt from "bcrypt"
import { response } from "express";
import jwt from "jsonwebtoken"


 export const signUpUser = async (req, res) => {
 
     const data = req.body;

     console.log("************************user data", data);
     const password = data.password; // password without hashed
 ; // shuffling of password / roind of suffleing more time more secure
     
     const hashedPassword = await bcrypt.hash(password, 10); // hashing......
 
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

      if (!registerUser) {
        return res.status(404).json({
          success: false,
          message: "user not found",
        });
      }
      const isMatched = await bcrypt.compare(password, registerUser?.password);
      //checking existing password (registeredUser) in Db vs pass entered by user while logged

      if (!isMatched) {
        return res.status(401).json({
          success: false,
          message: "password incorrect",
        });
      }

      console.log("**********registered user", registerUser);

      // sign a jwt
      const token = jwt.sign({ 
        id: registerUser._id,
        email: registerUser.email,
        name: registerUser.fullName,
        role: registerUser.role
       }, process.env.JWT_SECRET, { expiresIn: '2hr' });
      
      // signing a server side cookie 

      res.cookie("jwt-Token", token, {
        httpOnly: true,
        maxAge: 3600 * 1000, // 1hr (milliseconds)
        secure: false,
        sameSite: "lax"
      });




      res.status(200).json({
        success: true,
        message: "User registered successfully",
      });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
      console.log(error);
      
  }
};

// getting logged in user withput password field

export const getLoggedInUser = async (req, res) => {
 const loggedInUser =  await UserModal.findById(req.user.id).select('-password'); // using req.user from auth middleware
  res.status(200).json(loggedInUser);

}



export const LogoutUser = (req, res, next) => {
  res
    .clearCookie('jwt-Token', " ",{
      httpOnly: true,
      secure: false,     // must match login
      sameSite: 'lax',// must match login
      maxAge:0
    })
    .sendStatus(204);
};



// update user data controller
export const updateUser = async (req, res) => {
  try {
    const data = req.body;
    const userId = req.user.id; // from isAuthanticated middleware global req.user

   // filling updated data compatable with user Modal
    const updatedUserData = {
      phone: data.mobile,
      address: {
        street: data.address1,
        city: data.city,
        state: data.province,
        country: data.country,
        postalCode:data.zip,
      },
    };
    await UserModal.findByIdAndUpdate(userId, updatedUserData);

    console.log("***********user", userId);
    console.log("*********data to update ", data);



    res
      .status(200)
      .json({ message: " user updated successfully",  success:true });
    
    
  } catch (error) {
    console.log(error);
    res.state(404).json({ message: error });
    
  }
}