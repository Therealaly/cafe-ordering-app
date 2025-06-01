import { Html5Qrcode } from "html5-qrcode";
import { useEffect, useRef, useState } from "react";

const CustomQrScanner = ({ onScanSuccess }) => {
  const scannerRef = useRef(null);
  const [scanning, setScanning] = useState(false);

  const startCameraScan = async () => {
    const scanner = new Html5Qrcode("qr-reader");
    scannerRef.current = scanner;
    setScanning(true);

    try {
      const devices = await Html5Qrcode.getCameras();
      if (devices && devices.length) {
        const cameraId = devices[0].id;
        await scanner.start(
          cameraId,
          {
            fps: 10,
            qrbox: 300
            
          },
          (decodedText) => {
            onScanSuccess(decodedText);
            stopScanner(); // stop after success
          },
          () => {

          }
        );
      }
    } catch (err) {
      console.error("Camera start error:", err);
    }
  };

  const stopScanner = async () => {
    if (scannerRef.current) {
      await scannerRef.current.stop();
      scannerRef.current.clear();
      setScanning(false);
    }
  };

  const handleUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const scanner = new Html5Qrcode("qr-reader");
    try {
      const result = await scanner.scanFile(file, true);
      onScanSuccess(result);
    } catch (err) {
      console.error("Failed to scan file", err);
      alert("Gagal membaca file QR");
    }
  };

  useEffect(() => {
    return () => {
      stopScanner(); // clean up on unmount
    };
  }, []);

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <div className="w-sm aspect-video bg-gray-200 rounded-lg" id="qr-reader" />
      <div className="flex flex-col gap-3 w- max-w-md mt-4">
        {!scanning ? (
          <button
            onClick={startCameraScan}
            className="bg-green-600 text-white py-2 rounded-lg font-semibold"
          >
            Scan Kamera
          </button>
        ) : (
          <button
            onClick={stopScanner}
            className="bg-red-600 text-white py-2 rounded-lg font-semibold"
          >
            Stop Kamera
          </button>
        )}
        <label className="bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold text-center cursor-pointer">
          Upload File QR
          <input type="file" accept="image/*" onChange={handleUpload} hidden />
        </label>
      </div>
    </div>
  );
};

export default CustomQrScanner;
