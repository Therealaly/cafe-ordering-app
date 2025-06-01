import CustomQrScanner from "../components/CustomQrScanner";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { isLoggedIn } from "../utils/auth";

const QrScan = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn()) {
      navigate("/login");
    }
  }, [navigate]);

  const handleScanResult = (decodedText) => {
    console.log("QR scanned:", decodedText);
    navigate("/", { state: { tableNumber: decodedText } });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8 bg-gray-100 w-full">
      <h1 className="text-2xl font-bold text-black mb-2">Scan QR Meja</h1>
      <p className="text-gray-600 mb-6 text-center">
        Scan QR Code untuk mendapatkan nomor meja.
      </p>

      <CustomQrScanner onScanSuccess={handleScanResult} />
    </div>
  );
};

export default QrScan;
