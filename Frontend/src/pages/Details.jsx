import React from 'react'
import { useParams } from 'react-router'


const Details = () => {
    const {slug} = useParams() 
   // eslint-disable-next-line no-undef
   let item= products.find((item)=>{
      return item.slug==slug
    })
 
    
  return (
    <div className='container'>
      <p>Catageroy: {item.category}</p>
      <h1>{item.title}</h1>
      <p>{item.description}</p>
      <img style={{width:"200px"}} src={item.image} alt="" />
      <p className='mt-2'>
        <strong>
          Pkr:{item.price}
        </strong>
      </p>
       <button href="#" className="btn btn-primary w-100 mb-3">Add to Cart</button>
    </div>
  )
}

export default Details