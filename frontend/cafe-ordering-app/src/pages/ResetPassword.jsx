import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [successAlert, setSuccessAlert] = useState("");
  const [errorAlert, setErrorAlert] = useState("");
  const [loading, setLoading] = useState(false);

  const { userId, urlToken} = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Optional: You could add a check here to validate the token immediately on page load
    // by making a GET request to a new backend endpoint if desired,
    // but the POST request on submit will also validate it.
    if (!userId || !urlToken) {
      setErrorAlert("Link reset password tidak valid atau kedaluwarsa.");
      // Optionally redirect or disable the form
    }
  }, [userId, urlToken]);

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setErrorAlert("");
    setSuccessAlert("");

    if (newPassword !== confirmPassword) {
      setErrorAlert("Password baru dan konfirmasi password tidak cocok.");
      return;
    }
    if (newPassword.length < 6) { 
        setErrorAlert("Password minimal harus 6 karakter.");
        return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`http://localhost:5000/api/auth/reset-password/${userId}/${urlToken}`, {
        newPassword,
      });
      setSuccessAlert(response.data.message || "Password berhasil direset. Anda akan diarahkan ke halaman login.");
      setTimeout(() => {
        navigate("/login");
      }, 3000); // Redirect after 3 seconds
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Gagal mereset password. Silakan coba lagi.";
      setErrorAlert(errorMessage);
      console.error("Gagal mereset password:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div
        className="w-full flex-shrink-0 bg-center bg-no-repeat bg-cover"
        style={{
          height: "30vh", // Slightly smaller header for this page
          backgroundImage:
            'url("https://ik.imagekit.io/k9csxbksz/Warna%20kopi%20bldg2.png?updatedAt=1748360380862")',
        }}
      ></div>
      <div className="flex flex-col bg-gray-50 overflow-x-hidden w-full max-w-md mx-auto flex-1 p-6">
        <div className="flex justify-center pt-4 pb-2">
          <img
            src="https://ik.imagekit.io/k9csxbksz/logo%20hijau.png?updatedAt=1748360521163"
            alt="Warna Kopi Logo"
            className="h-16"
          />
        </div>
        <h1 className="px-4 text-xl font-semibold text-gray-800 mt-2 mb-4 text-center">
          Reset Password
        </h1>

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

        {!successAlert && ( // Hide form after success
          <form onSubmit={handlePasswordReset}>
            <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
              <label className="flex flex-col min-w-40 flex-1">
                <span className="text-sm font-medium text-gray-700 mb-1">Password Baru</span>
                <input
                  placeholder="Masukkan password baru"
                  type="password"
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-black focus:outline-0 focus:ring-0 border-none bg-gray-200 focus:border-none h-14 placeholder:text-[#648770] p-4 text-base font-normal leading-normal"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  disabled={loading}
                />
              </label>
            </div>
            <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
              <label className="flex flex-col min-w-40 flex-1">
                <span className="text-sm font-medium text-gray-700 mb-1">Konfirmasi Password Baru</span>
                <input
                  placeholder="Konfirmasi password baru"
                  type="password"
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-black focus:outline-0 focus:ring-0 border-none bg-gray-200 focus:border-none h-14 placeholder:text-[#648770] p-4 text-base font-normal leading-normal"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  disabled={loading}
                />
              </label>
            </div>
            <div className="flex px-4 py-3 mt-2">
              <button
                type="submit"
                className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 flex-1 bg-green-700 text-white text-base font-semibold leading-normal tracking-[0.015em] hover:bg-green-800 transition duration-200 disabled:opacity-70"
                disabled={loading || !userId || !urlToken || urlToken === "undefined"}
              >
                {loading ? "Mereset..." : "Reset Password"}
              </button>
            </div>
          </form>
        )}
         <div className="text-center mt-4">
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

export default ResetPassword;