import React from 'react'
import ProductCard from '../components/ProductCard'
import Carousel from '../components/Carousel'
import Features from '../components/Features'
import Categories from '../components/Catagories'
import FeatureProducts from '../components/FeatureProducts'
import SpecialOffer from '../components/SpecialOffer'
import RecentProducts from '../components/RecentProducts'


const Home = () => {


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
