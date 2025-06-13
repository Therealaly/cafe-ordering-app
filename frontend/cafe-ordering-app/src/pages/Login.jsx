import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState("")
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password
      });

      const { token, user } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      if (user.role === "kasir") {
        navigate("/kasir/dashboard");
      } else if (user.role === "admin" || user.role === "superadmin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/qr-scan");
      }
    } catch (error) {
        const errorMessage = error.response?.data?.message || error.message;
        setAlert(errorMessage);
        console.error("Login gagal:", errorMessage)
        }
    };
  

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div
      className="w-full flex-shrink-0 bg-center bg-no-repeat bg-cover"
      style={{
        height: "40vh",
        backgroundImage:
        'url("https://ik.imagekit.io/k9csxbksz/Warna%20kopi%20bldg2.png?updatedAt=1748360380862")'
      }}
      ></div>
      <div className="flex flex-col bg-gray-50 overflow-x-hidden w-full max-w-md mx-auto flex-1">
        <div className="flex justify-center pt-4 pb-2">
          <img
          src="https://ik.imagekit.io/k9csxbksz/logo%20hijau.png?updatedAt=1748360521163"
          alt="Warna Kopi Logo"
          className="h-16"
          />
        </div>
        <h1 className="px-4 text-lg font-semibold text-gray-800 mt-2">
          Login to Your Account
        </h1>
        { alert && (
          <div className="px-4 py-2 mx-4 mt-2 bg-red-800 text-white text-sm font-semibold rounded-lg">
            <p>{alert}</p>
          </div>
        )}
        <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
          <label className="flex flex-col min-w-40 flex-1">
          <input
            placeholder="Email or username"
            className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111713] focus:outline-0 focus:ring-0 border-none bg-gray-200 focus:border-none h-14 placeholder:text-[#648770] p-4 text-base font-normal leading-normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          </label>
        </div>
        <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
          <label className="flex flex-col min-w-40 flex-1">
          <input
            placeholder="Password"
            type="password"
            className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111713] focus:outline-0 focus:ring-0 border-none bg-gray-200 focus:border-none h-14 placeholder:text-[#648770] p-4 text-base font-normal leading-normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          </label>
        </div>
        <div>
          <button
            className="flex items-center justify-end px-4 py-2 text-sm text-gray-600 hover:text-green-700"
            onClick={() => navigate("/forgot-password")}
          >
            <span>Forgot Password?</span>
          </button>
        </div>
        <div className="flex px-4 py-3">
          <button
          className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 flex-1 bg-green-700 text-white text-base font-semibold leading-normal tracking-[0.015em]"
          onClick={handleLogin}
          >
          <span className="truncate">Login</span>
          </button>
        </div>
        <p className="text-[#648770] text-sm font-normal leading-normal pb-3 pt-1 px-4 text-center underline">
          Don't have an account? <a href="/register" className="text-green-700 underline">Sign up</a>
        </p>
      </div>
    </div>
  );
}

export default Login;