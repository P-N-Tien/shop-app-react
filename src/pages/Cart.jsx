import React, { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Navbar } from "../components";
import { addCart, delCart } from "../redux/action";
import { Button } from "react-bootstrap";
import { confirmDialog } from "@/components/Notify/Notifications";

const SHIPPING_FEE = 30000;

const EmptyCart = () => (
  <div className="container">
    <div className="row">
      <div className="col-md-12 py-5 bg-light text-center">
        <h4 className="p-3 display-5">Your Cart is Empty</h4>
        <Link to="/" className="btn btn-outline-dark mx-4">
          <i className="fa fa-arrow-left" /> Continue Shopping
        </Link>
      </div>
    </div>
  </div>
);

const CartItem = ({ item, imageUrl, onAdd, onRemove }) => (
  <div
    className="card border-0 mb-3 shadow-sm overflow-hidden"
    style={{ borderRadius: "12px" }}
  >
    <div className="card-body p-3">
      <div className="d-flex align-items-center justify-content-between flex-wrap flex-md-nowrap gap-3">
        <div className="flex-shrink-0">
          <img
            src={imageUrl}
            alt={item.name}
            className="rounded object-fit-cover"
            style={{ width: "90px", height: "90px" }}
          />
        </div>

        <div className="min-width-0">
          <h6
            className="mb-1 text-truncate fw-bold text-dark"
            title={item.name}
          >
            {item.name}
          </h6>
        </div>

        <div className="d-flex align-items-center bg-light rounded-pill px-2 py-1 shadow-sm">
          <button
            className="btn btn-sm btn-link text-decoration-none text-dark p-0 px-2"
            onClick={() => onRemove(item)}
            aria-label="Giảm"
          >
            <i className="fa fa-minus fs-xs" />
          </button>

          <span
            className="fw-bold px-3 mx-1"
            style={{ minWidth: "30px", textAlign: "center" }}
          >
            {item.qty}
          </span>

          <button
            className="btn btn-sm btn-link text-decoration-none text-dark p-0 px-2"
            onClick={() => onAdd(item)}
            aria-label="Tăng"
          >
            <i className="fa fa-plus fs-xs" />
          </button>
        </div>

        <div className="text-end" style={{ minWidth: "120px" }}>
          <span className="text-dark fw-bold fs-5">
            {(item.qty * item.price).toLocaleString()} VND
          </span>
        </div>
      </div>
    </div>
  </div>
);

const Cart = () => {
  const cartItems = useSelector((state) => state.cartReducer);
  const isLoggedIn = useSelector((state) => state.userReducer.isLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { subtotal, totalItems } = useMemo(() => {
    return cartItems.reduce(
      (acc, item) => {
        acc.subtotal += item.price * item.qty;
        acc.totalItems += item.qty;
        return acc;
      },
      { subtotal: 0, totalItems: 0 }
    );
  }, [cartItems]);

  const handleAddItem = (item) => dispatch(addCart(item));
  const handleRemoveItem = (item) => dispatch(delCart(item));

  const handleGoToCheckout = async () => {
    if (!isLoggedIn) {
      const isConfirmed = await confirmDialog(
        "Login Required",
        "Please login to proceed with your checkout.",
        "info"
      );
      if (isConfirmed) {
        navigate("/login", { state: { redirectTo: "/checkout" } });
      }
    } else {
      navigate("/checkout");
    }
  };

  if (!cartItems.length) {
    return (
      <>
        <Navbar />
        <EmptyCart />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <div className="d-flex align-items-end justify-content-between mb-4 pb-3 border-bottom">
          <div>
            <h2 className="fw-bold mb-0" style={{ letterSpacing: "-1px" }}>
              Shopping Cart
            </h2>
            <p className="text-muted mb-0">
              You have{" "}
              <span className="fw-bold text-dark">{totalItems} items</span> in
              your cart
            </p>
          </div>
          <Link
            to="/"
            className="text-decoration-none text-primary fw-semibold small"
          >
            <i className="fa fa-arrow-left me-2 mx-2" />
            Continue Shopping
          </Link>
        </div>

        <section className="h-100">
          <div className="container py-5">
            <div className="row d-flex justify-content-center my-4">
              {/* Cart Items */}
              <div className="col-md-8">
                <div className="mb-4">
                  {cartItems.map((item) => (
                    <CartItem
                      key={item.id}
                      item={item}
                      imageUrl={item?.thumbnailUrl}
                      onAdd={handleAddItem}
                      onRemove={handleRemoveItem}
                    />
                  ))}
                </div>
              </div>

              {/* Summary */}
              <div className="col-lg-4">
                <div
                  className="card border-0 shadow-sm sticky-top"
                  style={{ borderRadius: "16px", top: "2rem" }}
                >
                  <div className="card-body p-4">
                    <h5
                      className="fw-bold mb-4"
                      style={{ letterSpacing: "-0.5px" }}
                    >
                      Summary
                    </h5>

                    <div className="d-flex justify-content-between mb-3">
                      <span className="text-muted">
                        Products ({totalItems})
                      </span>
                      <span className="fw-semibold text-dark">
                        {Math.round(subtotal).toLocaleString()} VND
                      </span>
                    </div>

                    <div className="d-flex justify-content-between mb-3">
                      <span className="text-muted">Shipping fee</span>
                      <span className="text-success fw-medium">
                        {SHIPPING_FEE === 0
                          ? "Free"
                          : `${SHIPPING_FEE.toLocaleString()}`}{" "}
                        VND
                      </span>
                    </div>

                    <hr
                      className="my-4"
                      style={{ borderStyle: "dashed", opacity: "0.2" }}
                    />

                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <span className="h6 fw-bold mb-0">Total</span>
                      <div className="text-end">
                        <span className="h4 fw-bolder text-primary mb-0 d-block">
                          {Math.round(subtotal + SHIPPING_FEE).toLocaleString()}{" "}
                          VND
                        </span>
                        <small
                          className="text-muted"
                          style={{ fontSize: "0.75rem" }}
                        >
                          (VAT is included)
                        </small>
                      </div>
                    </div>

                    <Button
                      onClick={handleGoToCheckout}
                      className="btn btn-dark btn-lg w-100 py-3 shadow-sm d-flex align-items-center justify-content-center gap-2"
                      style={{ borderRadius: "12px", transition: "all 0.3s" }}
                    >
                      <span className="fw-bold mr-2">Checkout</span>
                      <i className="fa fa-arrow-right small" />
                    </Button>

                    <div className="mt-4 p-3 bg-light rounded-3">
                      <p className="small text-muted mb-0 text-center">
                        <i className="fa fa-shield-alt me-2 text-success" />
                        Secure and Safe Payment 100%
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Cart;
