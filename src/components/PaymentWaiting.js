import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const BACKEND_URL = "https://platformaspedytor8-back-production.up.railway.app";
const MAX_WAIT_TIME = 5 * 60; // 5 minut w sekundach

const PaymentWaiting = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [secondsLeft, setSecondsLeft] = useState(MAX_WAIT_TIME);

  useEffect(() => {
    // Pobranie transactionId z sessionStorage lub z query param
    const queryParams = new URLSearchParams(location.search);
    const transactionId = sessionStorage.getItem("tpayTransactionId") || queryParams.get("transactionId");

    if (!transactionId) {
      console.error("❌ Brak transactionId");
      navigate("/", { replace: true });
      return;
    }

    // Aktualizacja licznika co sekundę
    const timer = setInterval(() => {
      setSecondsLeft(prev => prev - 1);
    }, 1000);

    // Polling statusu co 3 sekundy
    const interval = setInterval(async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/tpay/check-status/${transactionId}`);
        const status = res.data.status;
        if (status === "paid" || status === "correct") {
          clearInterval(interval);
          clearInterval(timer);
          navigate("/success", { replace: true });
        }
      } catch (err) {
        console.error("Błąd przy sprawdzaniu statusu płatności:", err);
      }
    }, 3000);

    // Jeśli czas minie, zatrzymaj wszystko i pokaż komunikat
    if (secondsLeft <= 0) {
      clearInterval(interval);
      clearInterval(timer);
      alert("Nie otrzymaliśmy potwierdzenia płatności w ciągu 5 minut. Sprawdź status płatności w panelu.");
      navigate("/", { replace: true });
    }

    return () => {
      clearInterval(interval);
      clearInterval(timer);
    };
  }, [navigate, location, secondsLeft]);

  // Formatowanie sekund na MM:SS
  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;

  return (
    <h1>
      Oczekiwanie na potwierdzenie płatności... ({minutes}:{seconds.toString().padStart(2, "0")})
    </h1>
  );
};

export default PaymentWaiting;
