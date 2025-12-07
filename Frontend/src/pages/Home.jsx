import React from 'react'
import ProductCard from '../components/ProductCard'
import { useState } from 'react'
import { useEffect } from 'react'
import Carousel from '../components/Carousel'
import Features from '../components/Features'
import Categories from '../components/Catagories'
import FeatureProducts from '../components/FeatureProducts'
import SpecialOffer from '../components/SpecialOffer'
import RecentProducts from '../components/RecentProducts'


const Home = () => {

const [products , setProducts] = useState([])
const [min,setMin]= useState(0)
const [max,setMax]= useState(500)

 const getProductFromApi = async ()=>{
  const response = await fetch("http://localhost:7000/api/products");
  const data = await response.json()
  setProducts(data);
  
}

useEffect(()=>{
  getProductFromApi();
}, [])


const handelSearch =(e)=>{
if(e.target.value){
    const foundSearch = products.filter((product)=>( product.title.toLowerCase().includes(e.target.value.toLowerCase())));
  setProducts(foundSearch);
}
else{
  getProductFromApi();
}
}



const handelRatingSearch =(e)=>{
if(e.target.value){
    const foundSearch = products.filter((product)=> product.rating.rate>=e.target.value)
  setProducts(foundSearch);
}
else{
  getProductFromApi();
}
}


const priceMinimum =(e)=>{
  setMin(e.target.value)
}
const priceMaximum =(e)=>{
  setMax(e.target.value)
}

const handelSearchPrice = ()=>{
  if((min>0)&&(max>0)){
      const foundSearch = products.filter((product)=> ((product.price>min) && (product.price<max)))
  setProducts(foundSearch);
  }
  else{
    getProductFromApi();
  }
}

  return (
    <div>
     
      <Carousel />
      <Features />
      <Categories />
      <FeatureProducts />
      <SpecialOffer />
      <RecentProducts />
  



    </div>
  )
}

export default Home
