import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BACKEND_URL = "https://platformaspedytor8-back-production.up.railway.app";

const PaymentWaiting = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const transactionId = sessionStorage.getItem("tpayTransactionId");
    if (!transactionId) {
      navigate("/", { replace: true });
      return;
    }

    const interval = setInterval(async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/tpay/check-status/${transactionId}`);
        const status = res.data.status;
        if (status === "paid" || status === "correct") {
          clearInterval(interval);
          navigate("/success", { replace: true });
        }
      } catch (err) {
        console.error(err);
      }
    }, 3000); // co 3 sekundy

    return () => clearInterval(interval);
  }, [navigate]);

  return <h1>Oczekiwanie na potwierdzenie płatności...</h1>;
};

export default PaymentWaiting;
