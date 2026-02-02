import { useEffect } from "react";

export const usePaymentCallback = (channelName = "vnpay_payment_channel") => {
  useEffect(() => {
    const channel = new BroadcastChannel(channelName);

    const params = new URLSearchParams(window.location.search);
    const responseCode = params.get("vnp_ResponseCode");

    if (responseCode === "00") {
      channel.postMessage({ status: "SUCCESS" });
    } else {
      channel.postMessage({ status: "FAILED" });
    }

    setTimeout(() => {
      window.close();
    }, 500);

    return () => channel.close();
  }, [channelName]);
};
