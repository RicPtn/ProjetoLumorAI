import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // IMPORTADO AQUI
import image from "./assets/LumorLogo.png";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // HOOK DO REACT ROUTER

  const handleLogin = async (e) => {
    e.preventDefault();

    const response = await fetch(
      "http://localhost/ProjetoMLTumor/backend/PHP/screens/login.php",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        credentials: "include",
        body: new URLSearchParams({
          email: email,
          password: password,
        }),
      }
    );

    const result = await response.text();
    setMessage(result);

    if (result.includes("Login Feito.")) {
      navigate("/medicDash");
    } else if (result.includes("Login feito")) {
      navigate("/admDash");
    }
  };

  return (
    <div className="flex h-screen w-screen flex-col sm:flex-row">
      {/* Lado Esquerdo */}
      <div className="flex flex-2 flex-col items-center justify-center bg-linear-to-br from-[#013057] to-[#011f26] text-[#f1d369]">
        <img src={image} alt="Logo LumorAI" className="w-85 mb-10" />
        <h1 className="text-5xl font-bold">LumorAI</h1>
      </div>

      {/* Lado Direito */}
      <div className="flex flex-1 items-center justify-center bg-[#81817b]">
        <div className="bg-[#011f26] text-[#f1d369] p-10 rounded-2xl w-80 max-w-md text-center min-h-2/6">
          <h2 className="text-2xl font-bold mb-6">Login</h2>

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-11/12 px-4 py-3 rounded-full border-none text-center font-bold bg-white text-black focus:outline-none focus:ring-2 focus:ring-[#f1d369] marginlogin1 h-10"
            />
            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-11/12 px-4 py-3 rounded-full border-none text-center font-bold bg-white text-black focus:outline-none focus:ring-2 focus:ring-[#f1d369] marginlogin h-10"
            />
            <button
              type="submit"
              className="w-10/12 py-3 rounded-full bg-[#a0a08b] font-bold text-gray-800 hover:bg-[#f1d369] transition ease-in-out marginlogin h-10"
            >
              LOGIN
            </button>
          </form>
          <div className="mt-4 text-sm">
            <Link
              to="/forgot"
              className="block text-blue-300 hover:text-white transition ease-in-out margin-3"
            >
              Esqueci a Senha
            </Link>
            <Link
              to="/register"
              className="block mt-2 text-blue-300 hover:text-white transition ease-in-out"
            >
              Ainda não tem conta? Cadastre-se
            </Link>
            {message && <p className="text-sm mt-4">{message}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
