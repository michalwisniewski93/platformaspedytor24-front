import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const BACKEND_URL = "https://platformaspedytor8-back-production.up.railway.app";

const PaymentWaiting = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // 1️⃣ Pobranie transactionId z sessionStorage lub z query param
    const queryParams = new URLSearchParams(location.search);
    const transactionId = sessionStorage.getItem("tpayTransactionId") || queryParams.get("transactionId");

    if (!transactionId) {
      console.error("❌ Brak transactionId");
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
        console.error("Błąd przy sprawdzaniu statusu płatności:", err);
      }
    }, 3000); // co 3 sekundy

    return () => clearInterval(interval);
  }, [navigate, location]);

  return <h1>Oczekiwanie na potwierdzenie płatności...</h1>;
};

export default PaymentWaiting;
