import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [successAlert, setSuccessAlert] = useState("");
  const [errorAlert, setErrorAlert] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Initialize navigate

  const handleResetPassword = async (e) => {
    e.preventDefault(); // Prevent default form submission if it were a form
    setErrorAlert("");
    setSuccessAlert("");
    setLoading(true);

    if (!email) {
      setErrorAlert("Silakan masukkan alamat email Anda.");
      setLoading(false);
      return;
    }

    try {
      // Call the endpoint that sends the reset password email
      const response = await axios.post(`http://localhost:5000/api/auth/send-reset-password`, { email });
      setSuccessAlert(response.data.message || "Jika email terdaftar, link reset password telah dikirimkan.");
      setEmail(""); // Clear email field on success
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Gagal mengirim link reset password. Silakan coba lagi.";
      setErrorAlert(errorMessage);
      console.error("Gagal mengirim link reset password:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div
        className="w-full flex-shrink-0 bg-center bg-no-repeat bg-cover"
        style={{
          height: "30vh",
          backgroundImage:
            'url("https://ik.imagekit.io/k9csxbksz/Warna%20kopi%20bldg2.png?updatedAt=1748360380862")',
        }}
      ></div>
      <div className="flex flex-col bg-gray-50 max-w-md mx-auto p-6 rounded-2xl h-min shadow-sm mt-15 border-gray-200">
        <div className="flex justify-center pt-4 pb-2">
          <img
            src="https://ik.imagekit.io/k9csxbksz/logo%20hijau.png?updatedAt=1748360521163"
            alt="Warna Kopi Logo"
            className="h-16"
          />
        </div>
        <h1 className="px-4 text-xl font-semibold text-gray-800 mt-2 mb-2 text-center">
          Lupa Password Anda?
        </h1>
        <p className="px-4 text-sm text-gray-600 mb-4 text-center">
          Jangan khawatir! Masukkan email Anda di bawah ini dan kami akan mengirimkan link untuk mengatur ulang password anda.
        </p>
        
        {successAlert && (
          <div className="px-4 py-3 mx-auto mb-4 w-full bg-green-600 text-white text-sm font-semibold rounded-lg text-center">
            <p>{successAlert}</p>
          </div>
        )}
        {errorAlert && (
          <div className="px-4 py-3 mx-auto mb-4 w-full bg-red-700 text-white text-sm font-semibold rounded-lg text-center">
            <p>{errorAlert}</p>
          </div>
        )}

        {!successAlert && ( // Hide form if success message is shown
          <form onSubmit={handleResetPassword}>
            <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
              <label className="flex flex-col min-w-40 flex-1">
                <span className="text-sm font-medium text-gray-700 mb-1">Alamat Email</span>
                <input
                  placeholder="Masukkan Email Terdaftar"
                  type="email"
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-black focus:outline-0 focus:ring-0 border-none bg-gray-200 focus:border-none h-14 placeholder:text-[#648770] p-4 text-base font-normal leading-normal"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  required
                  disabled={loading}
                />
              </label>
            </div>
            <div className="flex px-4 py-3 mt-2">
              <button
                type="submit"
                className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 flex-1 bg-green-700 text-white text-base font-semibold leading-normal tracking-[0.015em] hover:bg-green-800 transition duration-200 disabled:opacity-70"
                disabled={loading}
              >
                {loading ? "Mengirim..." : "Kirim Link Reset Password"}
              </button>
            </div>
          </form>
        )}
         <div className="text-center mt-6">
            <button
                onClick={() => navigate("/login")}
                className="text-sm text-green-700 hover:underline"
            >
                Kembali ke Login
            </button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;