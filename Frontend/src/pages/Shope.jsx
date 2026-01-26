import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useFetch } from "../customHooks/useFetch";

const Shope = () => {
  const { cat_id } = useParams();
  const [category, setCategory] = useState();
  const [products, setProducts] = useState([]);

  // Fetch category name
  const fetchCategory = async () => {
    const res = await fetch(`http://localhost:7000/category/${cat_id}`);
    const catData = await res.json();
    setCategory(catData);
  };

  // Use custom hook to fetch products
  const { data, error, loading } = useFetch(
    `http://localhost:7000/product/${cat_id}`,
  );

  // Update products state whenever `data` changes
  useEffect(() => {
    if (data) {
      setProducts(data);
    }
  }, [data]);

  // Fetch category only once on mount or when `cat_id` changes
  useEffect(() => {
    if (cat_id) {
      fetchCategory();
    }
  }, [cat_id]);
  console.log("___________>",products);
  

  return (
    <div>
      <h2 className="section-title position-relative text-uppercase mx-xl-5 mb-5 mt-5">
        <span className="bg-secondary pr-3">{category?.data?.title}</span>
      </h2>

      {loading && <p>Loading products...</p>}
      {error && <p>Error loading products: {error}</p>}

      <div className="products-container">
        {products?.data?.map((product) => (
          <div key={product._id}>{product.title}</div>
        ))}
      </div>
    </div>
  );
};

export default Shope;
