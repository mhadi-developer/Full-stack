// Product data
const products = [
  {
    id: 1,
    img: "assesst/img/product-1.jpg",
    name: "Product Name Goes Here",
    price: 123,
    oldPrice: 123,
    stars: 5,
  },
  {
    id: 2,
    img: "assesst/img/product-2.jpg",
    name: "Product Name Goes Here",
    price: 123,
    oldPrice: 123,
    stars: 4.5,
  },
  {
    id: 3,
    img: "assesst/img/product-3.jpg",
    name: "Product Name Goes Here",
    price: 123,
    oldPrice: 123,
    stars: 3.5,
  },
  {
    id: 4,
    img: "assesst/img/product-4.jpg",
    name: "Product Name Goes Here",
    price: 123,
    oldPrice: 123,
    stars: 3,
  },
  {
    id: 5,
    img: "assesst/img/product-5.jpg",
    name: "Product Name Goes Here",
    price: 123,
    oldPrice: 123,
    stars: 5,
  },
  {
    id: 6,
    img: "assesst/img/product-6.jpg",
    name: "Product Name Goes Here",
    price: 123,
    oldPrice: 123,
    stars: 4.5,
  },
  {
    id: 7,
    img: "assesst/img/product-7.jpg",
    name: "Product Name Goes Here",
    price: 123,
    oldPrice: 123,
    stars: 3.5,
  },
  {
    id: 8,
    img: "assesst/img/product-8.jpg",
    name: "Product Name Goes Here",
    price: 123,
    oldPrice: 123,
    stars: 3,
  },
];

// Reusable card component
function ProductCard({ img, name, price, oldPrice, stars }) {
  // Convert rating number into FontAwesome stars
  const renderStars = () => {
    const full = Math.floor(stars);
    const half = stars % 1 !== 0;
    const empty = 5 - full - (half ? 1 : 0);

    return (
      <>
        {Array(full)
          .fill(0)
          .map((_, i) => (
            <small
              key={`f-${i}`}
              className="fa fa-star text-primary mr-1"
            ></small>
          ))}

        {half && (
          <small className="fa fa-star-half-alt text-primary mr-1"></small>
        )}

        {Array(empty)
          .fill(0)
          .map((_, i) => (
            <small
              key={`e-${i}`}
              className="far fa-star text-primary mr-1"
            ></small>
          ))}
      </>
    );
  };

  return (
    <div className="col-lg-3 col-md-4 col-sm-6 pb-1">
      <div className="product-item bg-light mb-4">
        <div className="product-img position-relative overflow-hidden">
          <img src={img} alt={name} className="img-fluid w-100" />

          <div className="product-action">
            <a href="#" className="btn btn-outline-dark btn-square">
              <i className="fa fa-shopping-cart"></i>
            </a>
            <a href="#" className="btn btn-outline-dark btn-square">
              <i className="far fa-heart"></i>
            </a>
            <a href="#" className="btn btn-outline-dark btn-square">
              <i className="fa fa-sync-alt"></i>
            </a>
            <a href="#" className="btn btn-outline-dark btn-square">
              <i className="fa fa-search"></i>
            </a>
          </div>
        </div>

        <div className="text-center py-4">
          <a href="#" className="h6 text-decoration-none text-truncate">
            {name}
          </a>

          <div className="d-flex align-items-center justify-content-center mt-2">
            <h5>${price}.00</h5>
            <h6 className="text-muted ml-2">
              <del>${oldPrice}.00</del>
            </h6>
          </div>

          <div className="d-flex align-items-center justify-content-center mb-1">
            {renderStars()}
            <small>(99)</small>
          </div>
        </div>
      </div>
    </div>
  );
}

// Main section
export default function FeatureProducts() {
  return (
    <section className="container-fluid pt-5 pb-3">
      <h2 className="section-title position-relative text-uppercase mx-xl-5 mb-4">
        <span className="bg-secondary pr-3">Featured Products</span>
      </h2>

      <div className="row px-xl-5">
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </section>
  );
}
