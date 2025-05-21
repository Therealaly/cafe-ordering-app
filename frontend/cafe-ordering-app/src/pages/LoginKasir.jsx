import { useState } from "react";
import { useNavigate } from "react-router-dom";


const LoginKasir = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    const dummyKasir = { email: "kasir@example.com", password: "123456", role: "kasir" };

    if (email === dummyKasir.email && password === dummyKasir.password) {
      localStorage.setItem("kasirAuth", JSON.stringify(dummyKasir))
      navigate("/kasir/dashboard")
    } else {
      alert("Login gagal. Coba lagi")
    };
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-950">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-black">Login Kasir</h1>
        <input type="email" placeholder="Email"
          value={email} onChange={e => setEmail(e.target.value)}
          className="w-full mb-4 p-2 border rounded border-gray-400 text-black" />
        <input type="password" placeholder="Password"
          value={password} onChange={e => setPassword(e.target.value)}
          className="w-full mb-6 p-2 border rounded border-gray-400 text-black" />
        <button onClick={handleLogin}
          className="w-full bg-green-700 text-white p-2 rounded hover:bg-green-800">
          Login
        </button>
      </div>
    </div>
  )
}

export default LoginKasir;