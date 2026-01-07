import React from 'react'
import Breadcrumb from '../components/Detail-page-component/BreadCrum.jsx'
import { useCart } from '../Custom-context/CartProvider.jsx'

const Cart = () => {
  
  const { cartState, IncreamentCart, DecrementCart , RemoveFromCart , ClearCart} = useCart();
  return (
    <div>
      <Breadcrumb />
      <div className="container-fluid">
        <div className="row px-xl-5">
          {/* Cart Table */}
          <div className="col-lg-8 table-responsive mb-5">
            <table className="table table-light table-borderless table-hover text-center mb-0">
              <thead className="table-dark">
                <tr>
                  <th>Products</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Remove</th>
                </tr>
              </thead>

              <tbody className="align-middle">
                {cartState?.length > 0 &&
                  cartState.map((item) => (
                    <tr key={item._id}>
                      <td className="align-middle">
                        <img
                          src={item?.mainImage?.secure_url}
                          alt="product"
                          style={{ width: "50px" }}
                          className="me-2"
                        />
                        {item.title}
                      </td>
                      <td className="align-middle">
                        {item.discountPrice}/-Pkr
                      </td>
                      <td className="align-middle">
                        <div
                          className="input-group quantity mx-auto"
                          style={{ width: "100px" }}
                        >
                          <button
                            className="btn btn-sm btn-primary"
                            onClick={() => DecrementCart(item)}
                          >
                            <i className="fa fa-minus"></i>
                          </button>
                          <input
                            type="text"
                            className="form-control form-control-sm  border-0 text-center form-custom"
                            value={item?.quantity}
                            readOnly
                          />
                          <button
                            className="btn btn-sm btn-primary"
                            onClick={() => IncreamentCart(item)}
                          >
                            <i className="fa fa-plus"></i>
                          </button>
                        </div>
                      </td>
                      <td className="align-middle">
                        {item?.discountPrice * item?.quantity}/-PKR
                      </td>
                      <td className="align-middle">
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => RemoveFromCart(item._id)}
                        >
                          <i className="fa fa-times"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            
              <button
                className="btn btn-lg btn-danger my-1"
              onClick={() => ClearCart()}
              disabled= { cartState.length == 0 ? true : false}
              >
               Clear Cart
              </button>
          </div>

          {/* Cart Summary */}
          <div className="col-lg-4">
            <form className="mb-4 mt-2">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control border-0 p-4"
                  placeholder="Coupon Code"
                />
                <button className="btn btn-primary">Apply Coupon</button>
              </div>
            </form>

            <h5 className="text-uppercase mb-3 mt-4">
              <span className="bg-secondary pe-3">Cart Summary</span>
            </h5>

            <div className="bg-light p-4 mb-5">
              <div className="border-bottom pb-2">
                <div className="d-flex justify-content-between mb-3">
                  <h6>Subtotal</h6>
                  <h6>$150</h6>
                </div>
                <div className="d-flex justify-content-between">
                  <h6 className="fw-medium">Shipping</h6>
                  <h6 className="fw-medium">$10</h6>
                </div>
              </div>

              <div className="pt-2">
                <div className="d-flex justify-content-between mt-2">
                  <h5>Total</h5>
                  <h5>$160</h5>
                </div>
                <button className="btn btn-primary fw-bold my-3 py-3 w-100">
                  Proceed To Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
