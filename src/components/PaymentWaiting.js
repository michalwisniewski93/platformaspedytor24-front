import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const PaymentWaiting = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const transactionId = sessionStorage.getItem("tpayTransactionId");
    if (!transactionId) {
      // Brak transactionId → wracamy na stronę główną
      navigate("/", { replace: true });
      return;
    }

    const interval = setInterval(async () => {
      try {
        const res = await axios.get(
          `https://platformaspedytor8-back-production.up.railway.app/tpay/check-status/${transactionId}`
        );

        if (res.data.status === "paid" || res.data.status === "correct") {
          clearInterval(interval);

          // Sprzątanie danych tymczasowych
          sessionStorage.removeItem("tpayTransactionId");

          // Przekierowanie na SuccessPage
          navigate("/success");
        }
      } catch (err) {
        console.error("Błąd podczas sprawdzania statusu transakcji:", err);
      }
    }, 2000); // sprawdzamy co 2 sekundy

    return () => clearInterval(interval); // sprzątanie przy unmount
  }, [navigate]);

  return (
    <div style={{ padding: 24 }}>
      <h2>Trwa przetwarzanie płatności...</h2>
      <p>Po zakończeniu transakcji zostaniesz automatycznie przekierowany na stronę sukcesu.</p>
    </div>
  );
};

export default PaymentWaiting;
