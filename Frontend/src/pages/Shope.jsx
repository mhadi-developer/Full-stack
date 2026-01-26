import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useFetch } from "../customHooks/useFetch";
import { useAuth } from "../Custom-context/AuthProvider";
import { useNavigate } from "react-router";
import { useCart } from "../Custom-context/CartProvider";
import { Link } from "react-router";

const Shope = () => {
  const { cat_id } = useParams();
  const [category, setCategory] = useState();
  const [products, setProducts] = useState([]);
  const { loggedInUserData } = useAuth();
  const {cartState, AddToCart}=useCart()
  const navigate = useNavigate();
  const RedirectUserToLogin = () => {
    navigate("/signin");
  };

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
  console.log("___________>", products);

  const StarRating = ({ value = 0, max = 5 }) => {
    const full = Math.floor(value);
    const half = value % 1 !== 0;
    const empty = max - full - (half ? 1 : 0);
  }
  

  return (
    <div>
      <h2 className="section-title position-relative text-uppercase mx-xl-5 mb-5 mt-5">
        <span className="bg-secondary pr-3">{category?.data?.title}</span>
      </h2>

      {loading && <p>Loading products...</p>}
      {error && <p>Error loading products: {error}</p>}

      <div className="products-container">
        
          <div className="row px-xl-5">
            {products?.data?.map((product) => (
              <div className="col-lg-3 col-md-4 col-sm-6 pb-1">
                <div className="product-item bg-light mb-4">
                  <div className="product-img position-relative overflow-hidden">
                    <img
                      src={product?.mainImage?.secure_url}
                      alt={product?.mainImage?.public_id}
                      className="img-fluid w-100"
                    />

                    <div className="product-action">
                      {loggedInUserData && loggedInUserData.fullName ? (
                        <button
                          className="btn btn-outline-dark btn-square"
                          onClick={() => AddToCart(productData)}
                          disabled={
                            cartState.find((item) => item.productId == _id)
                              ? true
                              : false
                          }
                        >
                          <i className="fa fa-shopping-cart"></i>
                        </button>
                      ) : (
                        <button
                          className="btn btn-outline-dark btn-square"
                          onClick={RedirectUserToLogin}
                        >
                          <i className="fa fa-shopping-cart"></i>
                        </button>
                      )}

                      <a href="#" className="btn btn-outline-dark btn-square">
                        <i className="fa fa-sync-alt"></i>
                      </a>
                      <a href="#" className="btn btn-outline-dark btn-square">
                        <i className="fa fa-search"></i>
                      </a>
                      <a href="#" className="btn btn-outline-dark btn-square">
                        <i className="fa fa-heart"></i>
                      </a>
                    </div>
                  </div>

                  <div className="text-center py-4">
                    <Link
                      to={`/product/detail/${product.slug}`}
                      className="h6 text-decoration-none"
                    >
                      {product.title}
                    </Link>

                    <div className="d-flex align-items-center justify-content-center mt-2">
                      <h5>PKR{product?.discountPrice}.00</h5>
                      <h6 className="text-muted ml-2">
                        <del>PKR{product.price}.00</del>
                      </h6>
                    </div>

                    <div className="d-flex align-items-center justify-content-center mb-1">
                      <StarRating value={4.5} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
      </div>
    </div>
  );
};

export default Shope;
