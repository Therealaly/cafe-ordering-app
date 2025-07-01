import CustomQrScanner from "../components/CustomQrScanner";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { isLoggedIn } from "../utils/auth";
import axios from "axios";

const QrScan = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn()) {
      navigate("/login");
    }
  }, [navigate]);

  const handleScanResult = async (decodedText) => {
    try {
      const {tableNumber, token} = JSON.parse(decodedText);

      const res = await axios.post("http://localhost:5000/api/qrcode/validate", 
        { tableNumber, token },
        { headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          }
        }
      );
      if (res.data.valid) {
        sessionStorage.setItem("tableNumber", tableNumber);
        navigate("/");
      } else {
        alert("Kode QR tidak valid.");
      }

    } catch (err) {
      alert("QR Code tidak dikenali.");
      console.error("QR Scan error:", err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8 bg-gray-100 w-full">
      <h1 className="text-2xl font-bold text-black mb-2">Scan QR Meja</h1>
      <p className="text-gray-600 mb-6 text-center text-sm">
        Scan QR Code untuk mendapatkan nomor meja. Pilih menu "Home" untuk melihat menu saja
      </p>

      <CustomQrScanner onScanSuccess={handleScanResult} />
    </div>
  );
};

export default QrScan;
