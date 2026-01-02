import React, { createContext } from 'react'
import { useFetch } from '../customHooks/useFetch';
import { useContext } from 'react';


export const AuthContext = createContext();


const AuthProvider = ({children}) => {

      const {
          data: loggedInUserData,
          error: loggedInUserError,
          loading: loggedInUserLoading
      } = useFetch("http://localhost:7000/users/loggedIn-user");
    // fetching the information of looged in user from backend whenever the app.jsx renders.
    
    return (
      <div>
        <AuthContext.Provider
          value={{ loggedInUserData, loggedInUserError , loggedInUserLoading}} >
                {children}   {/* children = App.jsx (children prop)*/}
        </AuthContext.Provider>
      </div>
    );
}

export default AuthProvider;




// custom hook for AuthContex

export const useAuth = () => useContext(AuthContext);









// 

// Child prop Concept 


// function childprop({children}) {
//   return (
//     <p> {children}</p>
//   )
// }


// <childprop>
//   <ul>
//     <li><a href=""></a><a href=""></a></li>
//   </ul>
//   <ul>
//     <li><a href=""></a><a href=""></a></li>
//   </ul>
//   <ul>
//     <li><a href=""></a><a href=""></a></li>
//   </ul>
// </childprop>