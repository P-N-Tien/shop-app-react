import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { showSuccessAlert } from "../components/Notify/Notifications";
import { useDispatch } from "react-redux";
import { clearCard } from "@/redux/action";

export const usePaymentListener = (channelName = "vnpay_payment_channel") => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    // Initial Broadcast Channel
    const channel = new BroadcastChannel(channelName);

    channel.onmessage = (event) => {
      const { status, orderId } = event.data;
      if (status === "SUCCESS") {
        // Enable Order Button
        localStorage.setItem("isProcessPayment", false);
        dispatch(clearCard());
        const confirm = showSuccessAlert(
          "Payment Successful!",
          "We have received your payment. Your order is being processed.",
          "Go to Home"
        );
        if (confirm.isConfirmed) {
          navigate("/");
        }
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
