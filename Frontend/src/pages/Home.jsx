/* eslint-disable no-unused-vars */
import React from 'react'
import ProductCard from '../components/ProductCard'
import Carousel from '../components/Carousel'
import Features from '../components/Features'
import Categories from '../components/Catagories'
import FeatureProducts from '../components/FeatureProducts'
import SpecialOffer from '../components/SpecialOffer'
import RecentProducts from '../components/RecentProducts'
import { useFetch } from '../customHooks/useFetch'


const Home = ({ categories }) => {
  
  const {data:products , error , loading } = useFetch('http://localhost:7000/products')
  return (
    <div>
      <Carousel />
      <Features />
      <Categories categories={categories} />
      <FeatureProducts products ={products} />
      <SpecialOffer />
      <RecentProducts />
    </div>
  );
};

export default Home
