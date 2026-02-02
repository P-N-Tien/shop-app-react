import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { showSuccessAlert } from "../components/Notify/Notifications";

export const usePaymentListener = (channelName = "vnpay_payment_channel") => {
  const navigate = useNavigate();

  useEffect(() => {
    // Initial Broadcast Channel
    const channel = new BroadcastChannel(channelName);

    channel.onmessage = (event) => {
      const { status, orderId } = event.data;

      if (status === "SUCCESS") {
        showSuccessAlert(
          "Payment Successful!",
          "We have received your payment. Your order is being processed.",
          "View Orders"
        ).then(() => {
          navigate("/orders");
        });
      } else if (status === "FAILED") {
        console.error("Payment failed for order:", orderId);
      }
    };

    return () => {
      // IMPORTANT: Close channel when component unmount
      channel.close();
    };
  }, [channelName, navigate]);
};
