import React from 'react'
import ProductCard from '../components/ProductCard'
import { useState } from 'react'
import { useEffect } from 'react'

const Home = () => {

const [products , setProducts] = useState([])
const [min,setMin]= useState(0)
const [max,setMax]= useState(500)

 const getProductFromApi = async ()=>{
  const response = await fetch('https://fakestoreapi.com/products');
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
        
       <div className="container">
        <input type="search" className='mt-5 mb-3 form-control' style={{width:'50%', border:'1px solid green'}} onChange={handelSearch}  placeholder='search'/>
        <button className='btn btn-success' onClick={handelSearch}>Search</button>

          <input type="search" className='mt-5 mb-3 form-control' placeholder='search by rating' style={{width:'50%', border:'1px solid green'}} onChange={handelRatingSearch}/>


          <input type="text"  className='my-2 mx-2 form-control p-1' placeholder='minimum price' style={{width:'20%',border:'1px solid green'}} onChange={priceMinimum} />
          <button className='btn btn-success my-1 mx-3' onClick={handelSearchPrice}>Filter by Price</button>
           <input type="text"  className='my-2 mx-2 form-control p-1' placeholder='maximum price' style={{width:'20%',border:'1px solid green'}} onChange={priceMaximum} />
    <div className="row">
      {
        products.map(product=>(
          <div className="col-md-4">
           <ProductCard product={product}/>
      </div>
        ))
      }
    </div>
  </div>
    </div>
  )
}

export default Home
