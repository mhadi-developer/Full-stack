import { Link } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";

const PaymentSuccess = () => {
  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center  px-3">
      <div className="card border-0 shadow-lg rounded-4 bg-secondary" style={{ maxWidth: "460px", width: "100%" }}>
        <div className="card-body p-4 p-md-5 text-center">

          {/* Success Icon */}
          <div className="mb-4">
            <div
              className="d-inline-flex align-items-center justify-content-center rounded-circle bg-success bg-opacity-10"
              style={{ width: "90px", height: "90px" }}
            >
              <i className="bi bi-check-circle-fill text-white fs-1"></i>
            </div>
          </div>

          {/* Title */}
          <h2 className="fw-semibold text-dark mb-2">
            Payment Successful
          </h2>

          {/* Description */}
          <p className="text-muted mb-4">
            Your payment has been processed successfully.  
            We have received your order and it is now being prepared.
          </p>

          {/* Order Summary */}
          <div className="bg-light rounded-3 p-3 mb-4 text-start">
            <div className="d-flex justify-content-between mb-2">
              <span className="text-muted small">Order ID</span>
              <span className="fw-medium text-dark">#ORD-92831</span>
            </div>
            <div className="d-flex justify-content-between">
              <span className="text-muted small">Payment Method</span>
              <span className="fw-medium text-dark">Card (Stripe)</span>
            </div>
          </div>

          {/* Actions */}
          <div className="d-grid gap-3">
            <Link
              to="/orders"
              className="btn btn-success btn-lg rounded-pill"
            >
              View Order
            </Link>

            <Link
              to="/"
              className="btn btn-primary btn-lg rounded-pill"
            >
              Continue Shopping
            </Link>
          </div>

          {/* Footer */}
          <p className="text-muted small mt-4 mb-0">
            A confirmation email has been sent to your registered email address.
          </p>

        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
