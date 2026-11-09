import React, { useState } from "react";
import "../App.css";
import { Link } from "react-router-dom";
import image from "./assets/LumorLogo.png";
import { useNavigate } from "react-router-dom";
function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const sendEmail = async (e) => {
    e.preventDefault();

    const response = await fetch(
      "http://localhost/ProjetoMLTumor/backend/PHP/screens/esquecisenha.php",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        credentials: "include",
        body: new URLSearchParams({
          email: email,
        }),
      }
    );
    const result = await response.text();
    console.log(result)
    if (result.includes("Email enviado.")) {
      navigate("/validate");
    } else if (result.includes("Erro ao enviar email.")) {
      setMsg("Erro ao enviar o email.");
    } else if (result.includes("Email não encontrado.")) {
      setMsg("Email não encontrado.");
    }
  };

  return (
    <div className="flex h-screen w-screen">
      {/* Lado Esquerdo */}
      <div className="flex flex-2 flex-col items-center justify-center bg-linear-to-br from-[#013057] to-[#011f26] text-[#f1d369]">
        <img src={image} alt="Logo LumorAI" className="w-85 mb-10" />
        <h1 className="text-5xl font-bold">LumorAI</h1>
      </div>

      {/* Lado Direito */}
      <div className="flex flex-1 items-center justify-center bg-[#81817b]">
        <div className="bg-[#011f26] text-[#f1d369] p-10 rounded-2xl w-80 max-w-md text-center min-h-2/6">
          <h2 className="text-2xl font-bold mb-6">Esqueceu a senha?</h2>

          {/* Formulário */}
          <form onSubmit={sendEmail} className="space-y-4">
            <input
              type="text"
              placeholder="Email ou telefone"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-11/12 x-4 py-3 rounded-full border-none text-center font-bold bg-white text-black focus:outline-none focus:ring-2 focus:ring-[#f1d369] marginlogin1 h-10"
            />

            <button
              type="submit"
              className="w-10/12 py-3 rounded-full bg-[#a0a08b] font-bold text-gray-800 hover:bg-[#f1d369] transition ease-in-out marginlogin h-10"
            >
              Enviar código de recuperação
            </button>
          </form>

          {/* Links */}
          <div className="mt-2 text-sm">
            <Link
              to="/ProjetoMLTumor/frontend/build"
              className="block text-blue-300 hover:text-white transition ease-in-out margin-3"
            >
              Já tem conta? Login
            </Link>
            <Link
              to="/register"
              className="block mt-2 text-blue-300 hover:text-white transition ease-in-out"
            >
              Ainda não tem conta? Cadastre-se
            </Link>
            {msg && <p className="text-sm mt-4">{msg}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
