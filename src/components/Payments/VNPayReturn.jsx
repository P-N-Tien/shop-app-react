import { useValidateVNPay } from "@/hooks/useVNPay";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import NavigationBar from "../Navbar/Navbar";

const VNPayReturn = () => {
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const paramsObj = Object.fromEntries(queryParams.entries());
  const channel = new BroadcastChannel("vnpay_payment_channel");

  const { mutate: validateVNPayAsync, isPending } = useValidateVNPay();
  const [result, setResult] = useState({ status: "processing", message: "" });
  const [retryCount, setRetryCount] = useState(0);
  const MAX_RETRIES = 5;

  useEffect(() => {
    const handleValidation = () => {
      try {
        const data = validateVNPayAsync(paramsObj);

        if (!data.success) {
          // Wrong Signature: Stop and notify now
          setResult({ status: "FAILED", message: data.message });
          return;
        }

        // Waiting result from VNP IPN
        if (data.paymentStatus === "PENDING") {
          if (retryCount < MAX_RETRIES) {
            setTimeout(() => setRetryCount((prev) => prev + 1), 2000);
          } else {
            setResult({
              status: "FAILED",
              message: "Timeout: Confirmation taking too long.",
            });
          }
        }
        // Received the final result (SUCCESS or FAILED from DB)
        else {
          setResult({
            status: data.paymentStatus,
            message: data.message,
          });
          finishSession();
        }
      } catch (error) {
        setResult({ status: "FAILED", message: "System error occurred" });
      }
    };

    // Close tab
    const finishSession = () => {
      setTimeout(() => {
        channel.close();
        window.close();
      }, 2500); // Increased to 2.5s so users have time to read the notice
    };

    handleValidation();
  }, [retryCount]);

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
