import { useValidateVNPay } from "@/hooks/useVNPay";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import NavigationBar from "../Navbar/Navbar";

const VNPayReturn = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const paramsObj = Object.fromEntries(queryParams.entries());

  const { data, isPending } = useValidateVNPay(paramsObj, {
    retry: 5,
    retryDelay: 2000,
  });

  const [result, setResult] = useState({ status: "processing", message: "" });
  console.log("data", data);
  useEffect(() => {
    if (data && data.paymentStatus !== "PENDING") {
      const channel = new BroadcastChannel("vnpay_payment_channel");

      setResult({
        status: data.paymentStatus,
        message: data.message,
      });

      channel.postMessage({
        status: "SUCCESS",
        message: data?.message,
        orderId: queryParams.get("vnp_TxnRef"),
      });

      // Finish Session
      const timer = setTimeout(() => {
        channel.close();
        window.close();
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, [data]);

  const renderContent = () => {
    if (isPending || result.status === "processing") {
      return (
        <>
          <div className="spinner-border text-primary mb-3" role="status"></div>
          <h4 className="fw-bold">Verifying transaction...</h4>
          <p className="text-muted">Please keep this window open.</p>
        </>
      );
    }

    return (
      <>
        <div
          className={`mb-3 display-4 ${
            result.status === "SUCCESS" ? "text-success" : "text-danger"
          }`}
        >
          {result.status === "SUCCESS" ? "✓" : "✕"}
        </div>
        <h4 className="fw-bold">
          {result.status === "SUCCESS" ? "Success!" : "Failed"}
        </h4>
        <p className="text-muted">{result.message}</p>
        <small className="text-secondary italic">
          This window will close automatically in a moment...
        </small>
      </>
    );
  };

  return (
    <>
      <NavigationBar />
      <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
        <div
          className="text-center p-5 shadow-sm bg-white rounded-4"
          style={{ minWidth: "350px" }}
        >
          {renderContent()}
        </div>
      </div>
    </>
  );
};

export default VNPayReturn;
