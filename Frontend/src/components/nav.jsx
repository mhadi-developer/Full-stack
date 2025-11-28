/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Link } from "react-router";
import { CartContext } from "../App.jsx";
import { useContext } from "react";






export default function Nav() {


const {cart, setCart}=useContext(CartContext);

  
  let [showmenue,setShowMeanue]= useState(false)
  function handelToggle(){
    setShowMeanue(!showmenue);
  }


  return <>
  <div className="navbar-wrapper">
      <nav className="navbar navbar-expand-lg navbar-light bg-success">
  <div className="container">
    <Link className="navbar-brand" to="/">E-Shop</Link>
    <button className="navbar-toggler" type="button" onClick={handelToggle} data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      {
        showmenue ? <i className="bi bi-x-lg"></i>:<span className="navbar-toggler-icon"></span>
}
    </button>
    <div className={`collapse navbar-collapse ${showmenue? 'show':''}`} id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
       
        <li className="nav-item">
          <Link className="nav-link" to="/about">About</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/contact">Contact</Link>
        </li>
        
      </ul>
       <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link " aria-current="page" to="/login"><i className="bi bi-person"></i></Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/cart"><i className="bi bi-cart">{cart.length}</i></Link>
        </li>
       
        <li className="nav-item">
          <Link className="nav-link " to="#"><i className="bi bi-search"></i></Link>
        </li>
        
      </ul>
    </div>
  </div>
</nav>
  </div>
  </>;
}
