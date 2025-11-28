import React, { useState } from 'react'





const Login = () => {


  // initial state for login
const [user,setUser] = useState({
  email:'',
  password:''
})

const handelChange=(e)=>{
  console.log("namw-----",e.target.name);
  const feildname = e.target.name;
setUser({...user, [feildname]:e.target.value})

  
}

const handelSubmit = (e)=>{
  e.preventDefault()
  console.log(user);
  
}

// islogin?
const [isLogin , setIsLogin] = useState(true);





// initial state for signup

const [signUpUser, setSignUpUser] = useState({
  fullname:'',
  email:'',
  password:'',
  rpassword:'',
  image:null,
  phone:''
})

  const handelSignUPchange = e => {
    const { name, value, files } = e.target;

    setSignUpUser(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

const handelSignUp = (e)=>{
  e.preventDefault()
 const data = new FormData();
 data.append('fullname',signUpUser.fullname);
 data.append('password',signUpUser.password);
 data.append('rpassword',signUpUser.rpassword);
 data.append('email',signUpUser.email);
 data.append('image',signUpUser.image);
 data.append('phone',signUpUser.phone);


 for (let pair of data.entries()) {
  console.log(pair[0], pair[1]);
}
 
  
}

const handelFormDisplay = ()=>{
  setIsLogin(!isLogin)
}

  return (
    <>
    <div className='container my-3'>
      <button className='btn btn-success me-3' onClick={handelFormDisplay}> Login Here</button>
         <button className='btn btn-outline-success' onClick={handelFormDisplay}> SignUp Here</button>

        {
          isLogin?  <div className="login-wrapper">
            <h1 className='mt-5'>Login</h1> 
          <form className="row g-3 w-50" onSubmit={handelSubmit}>
  <div className="col-md-12">
    <label htmlFor="inputEmail4" className="form-label">Email</label>
    <input onChange={handelChange} type="email" className="form-control"  name='email'/>
    <p>{user.email}</p>
  </div>
  <div className="col-md-12">
    <label htmlFor="inputPassword4" className="form-label">Password</label>
    <input type="password"  onChange={handelChange} className="form-control"  name='password'/>
    <p>{user.password}</p>
  </div>
 
  <div className="col-12">
    <button type="submit" className="btn btn-success">Sign in</button>
  </div>
</form>
      </div> : 
        <div className="signupWrapper container my-5">
        <h1>Sign Up</h1>
     <form className="row g-3 w-50" onSubmit={handelSignUp}>
  <div className="col-md-12">
    <label htmlFor="fullname" className="form-label">Full Name</label>
    <input onChange={handelSignUPchange} value={signUpUser.fullname} type="text" className="form-control"   name='fullname'/>
    
  </div>
   <div className="col-md-12">
    <label htmlFor="inputEmail4" className="form-label">Email</label>
    <input onChange={handelSignUPchange}  value={signUpUser.email} type="email" className="form-control"  name='email'/>
  
  </div>
  <div className="col-md-12">
    <label htmlFor="inputPassword4" className="form-label">Password</label>
    <input type="password"  onChange={handelSignUPchange} value={signUpUser.password} className="form-control"  name='password'/>
 
  </div>
   <div className="col-md-12">
    <label htmlFor="inputPassword4" className="form-label">Confirm Password</label>
    <input type="password"  onChange={handelSignUPchange} value={signUpUser.rpassword} className="form-control"  name='rpassword'/>
   
  </div>
  <div className="col-md-12">
    <label htmlFor="inputPhone" className="form-label">Phone</label>
    <input type="number"  onChange={handelSignUPchange} value={signUpUser.phone} className="form-control"  name='phone'/>
  
  </div>
    <div className="col-md-12">
    <label htmlFor="image" className="form-label">Upload Image</label>
    <input type="file"  onChange={handelSignUPchange} className="form-control"  name='image'/>
  
  </div>
 
  <div className="col-12">
    <button type="submit" className="btn btn-info">Sign Up</button>
  </div>
</form>
 </div>

 }
      
    </div>
    
 
</>

  )
}

export default Login