import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navbar } from "../components";
import { useCheckout } from "../hooks/useOrder";
import {
  showErrorAlert,
  showSuccessAlert,
} from "../components/Notify/Notifications";
import { clearCard } from "../redux/action";
import { localStorageUtils } from "../utils/localStorageUtils";
import { usePaymentListener } from "../hooks/usePaymentListener";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const SHIPPING_FEE = 30;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  usePaymentListener();
  const cartItems = useSelector((state) => state.cartReducer);
  const isEmptyCart = !cartItems?.length;

  const [paymentMethod, setPaymentMethod] = useState(
    localStorageUtils.getShippingInfo().paymentMethod
  );
  const { mutate: createOrder, isPending } = useCheckout();

  const [formData, setFormData] = useState(() => {
    return (
      localStorageUtils.getShippingInfo() || {
        recipientName: "",
        recipientPhone: "",
        recipientAddress: "",
        note: "",
      }
    );
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const newFormData = { ...formData, [name]: value };

    setFormData(newFormData);
    localStorageUtils.saveShippingInfo(newFormData);
  };

  const handlePaymentMethodChange = (e) => {
    const { value } = e.target;
    const newFormData = { ...formData, paymentMethod: value };

    setPaymentMethod(value);
    localStorageUtils.saveShippingInfo(newFormData);
  };

  const { subtotal, totalItems, totalAmount } = useMemo(() => {
    const subtotal = cartItems.reduce(
      (sum, item) => sum + item.price * item.qty,
      0
    );
    const totalItems = cartItems.reduce((sum, item) => sum + item.qty, 0);
    return {
      subtotal,
      totalItems,
      totalAmount: Math.round(subtotal + SHIPPING_FEE),
    };
  }, [cartItems]);

  // Handle Submit Form
  const handleSubmit = (e) => {
    e.preventDefault();

    // Build Object Checkout
    const payload = {
      recipientName: formData.recipientName.trim(),
      recipientPhone: formData.recipientPhone.trim(),
      recipientAddress: formData.recipientAddress.trim(),
      note: formData.note.trim(),
      paymentMethod: formData.paymentMethod,
      items: cartItems.map((item) => ({
        productId: item.id,
        quantity: item.qty,
      })),
    };

    // Create Order
    createOrder(payload, {
      onSuccess: (data) => {
        if (paymentMethod === "COD") {
          // 1. Popup notify

          showSuccessAlert(
            "Order Placed!",
            "Thank you for your purchase. Your order is being processed.",
            "Go to Home"
          ).then(() => {
            navigate("/");
          });

          // 2. Remove cart
          dispatch(clearCard());
        } else {
          window.open(data.paymentUrl, "_blank", "noopener,noreferrer");
        }
      },
      onError: (err) => {
        showErrorAlert("Submission Failed", err.message);
      },
    });
  };

  return (
    <>
      <Navbar />
      <div className="container py-5">
        {/* Header Section */}
        <div className="d-flex align-items-center gap-3 mb-5 border-bottom pb-4">
          <div
            className="bg-dark text-white rounded-circle d-flex align-items-center justify-content-center"
            style={{ width: "40px", height: "40px" }}
          >
            <i className="fa fa-lock small"></i>
          </div>
          <h2 className="fw-bold mb-0" style={{ letterSpacing: "-1px" }}>
            Secure Checkout
          </h2>
        </div>

        <div className="row g-5">
          {/* Right Column: Order Summary */}
          <div className="col-md-5 col-lg-4 order-md-last">
            <div
              className="card border-0 shadow-sm sticky-top"
              style={{ borderRadius: "16px", top: "2rem" }}
            >
              <div className="card-body p-4">
                <h5 className="fw-bold mb-4 d-flex align-items-center gap-2">
                  <i className="fa fa-shopping-bag text-warning"></i> Order
                  Summary
                </h5>
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted">Items ({totalItems})</span>
                  <span className="fw-semibold">
                    {Math.round(subtotal).toLocaleString()} VND
                  </span>
                </div>
                <div className="d-flex justify-content-between mb-4">
                  <span className="text-muted">Shipping</span>
                  <span className="text-success fw-medium">
                    {isEmptyCart ? 0 : SHIPPING_FEE.toLocaleString()} VND
                  </span>
                </div>

                <hr className="my-3" style={{ borderStyle: "dashed" }} />

                <div className="d-flex justify-content-between align-items-center">
                  <span className="h6 fw-bold mb-0">Total</span>
                  <span className="h4 fw-bolder text-primary mb-0">
                    {isEmptyCart ? 0 : totalAmount.toLocaleString()} VND
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Left Column: Billing & Payment */}
          <div className="col-md-7 col-lg-8">
            <form onSubmit={handleSubmit}>
              {/* Billing Section */}
              <div
                className="card border-0 shadow-sm mb-4"
                style={{ borderRadius: "16px" }}
              >
                <div className="card-body p-4">
                  <h5 className="fw-bold mb-4 d-flex align-items-center gap-2">
                    <i className="fa fa-user-circle text-primary"></i> Shipping
                    Information
                  </h5>

                  <div className="row g-3">
                    <div className="col-sm-6">
                      <label className="form-label small fw-bold text-muted">
                        FULL NAME
                      </label>
                      <input
                        type="text"
                        name="recipientName"
                        className="form-control form-control-lg bg-light border-0"
                        placeholder="e.g. John Doe"
                        required
                        value={formData.recipientName}
                        onChange={handleInputChange}
                        style={{ fontSize: "0.95rem" }}
                      />
                    </div>
                    <div className="col-sm-6">
                      <label className="form-label small fw-bold text-muted">
                        PHONE NUMBER
                      </label>
                      <input
                        name="recipientPhone"
                        className="form-control form-control-lg bg-light border-0"
                        placeholder="+1..."
                        required
                        value={formData.recipientPhone}
                        onChange={handleInputChange}
                        style={{ fontSize: "0.95rem" }}
                      />
                    </div>
                    <div className="col-12">
                      <label className="form-label small fw-bold text-muted">
                        SHIPPING ADDRESS
                      </label>
                      <input
                        type="text"
                        name="recipientAddress"
                        className="form-control form-control-lg bg-light border-0"
                        placeholder="Street name, City, Country"
                        required
                        value={formData.recipientAddress}
                        onChange={handleInputChange}
                        style={{ fontSize: "0.95rem" }}
                      />
                    </div>
                    <div className="col-12">
                      <label className="form-label small fw-bold text-muted">
                        ORDER NOTE (OPTIONAL)
                      </label>
                      <textarea
                        name="note"
                        className="form-control bg-light border-0"
                        rows="2"
                        placeholder="Notes about your order..."
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Section */}
              <div
                className="card border-0 shadow-sm"
                style={{ borderRadius: "16px" }}
              >
                <div className="card-body p-4">
                  <h5 className="fw-bold mb-4 d-flex align-items-center gap-2">
                    <i className="fa fa-credit-card text-primary"></i> Payment
                    Method
                  </h5>

                  <div className="row g-3">
                    <div className="col-md-6">
                      <label
                        className={`w-100 p-3 border rounded-3 d-flex align-items-center gap-3 cursor-pointer transition-all ${
                          paymentMethod === "COD"
                            ? "border-primary bg-light"
                            : ""
                        }`}
                        style={{ cursor: "pointer" }}
                      >
                        <input
                          type="radio"
                          name="payment"
                          value="COD"
                          checked={paymentMethod === "COD"}
                          onChange={handlePaymentMethodChange}
                          className="form-check-input mt-0"
                        />
                        <div>
                          <div className="fw-bold">Cash on Delivery</div>
                          <small className="text-muted">
                            Pay when you receive
                          </small>
                        </div>
                      </label>
                    </div>

                    <div className="col-md-6">
                      <label
                        className={`w-100 p-3 border rounded-3 d-flex align-items-center gap-3 cursor-pointer transition-all ${
                          paymentMethod === "VNPAY"
                            ? "border-primary bg-light"
                            : ""
                        }`}
                        style={{ cursor: "pointer" }}
                      >
                        <input
                          type="radio"
                          name="payment"
                          value="VNPAY"
                          checked={paymentMethod === "VNPAY"}
                          onChange={handlePaymentMethodChange}
                          className="form-check-input mt-0"
                        />
                        <div>
                          <div className="fw-bold">VNPay Digital Wallet</div>
                          <small className="text-muted">QR, ATM, Banking</small>
                        </div>
                      </label>
                    </div>
                  </div>

                  <hr className="my-4 opacity-25" />

                  <button
                    className={`w-100 btn btn-lg py-3 shadow-sm fw-bold border-0 transition-all d-flex align-items-center justify-content-center gap-2 ${
                      paymentMethod === "COD" ? "btn-dark" : "btn-primary"
                    }`}
                    type="submit"
                    disabled={isPending || isEmptyCart}
                    style={{ borderRadius: "12px", minHeight: "62px" }} // Giữ chiều cao cố định để không bị giật khi hiện loading
                  >
                    {isPending ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm"
                          role="status"
                          aria-hidden="true"
                        ></span>
                        <span>Processing...</span>
                      </>
                    ) : (
                      <>
                        {paymentMethod === "COD" ? (
                          <>
                            <i className="fa fa-check-circle"></i>
                            <span>Complete Order</span>
                          </>
                        ) : (
                          <>
                            <i className="fa fa-wallet"></i>
                            <span>Pay via VNPay</span>
                          </>
                        )}
                      </>
                    )}
                  </button>

                  <p className="text-center text-muted small mt-3">
                    <i className="fa fa-shield-alt me-1"></i> Your data is
                    encrypted and secure.
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
