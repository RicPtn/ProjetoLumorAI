import React, { useState } from "react";
import { Link } from "react-router-dom";
import image from "./assets/LumorLogo.png";
import { useNavigate } from "react-router-dom";
function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordcon, setPasswordcon] = useState("");
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");
  const [cpf, setCpf] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();

    const response = await fetch(
      "http://localhost/ProjetoMLTumor/backend/PHP/screens/registroADM.php",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          username: username,
          password: password,
          passwordcon: passwordcon,
          email: email,
          tel: tel,
          cpf: cpf,
        }),
      }
    );

    const result = await response.text();
    setMessage(result);

    if (result.includes("Conta criada")) {
      // Redireciona para o painel (caso use rota do React ou redirecionamento)
      navigate("/ProjetoMLTumor/frontend/build"); // ou o caminho certo
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
        <div className="bg-[#011f26] text-[#f1d369] p-10 rounded-2xl w-80 max-w-md text-center min-h-7/12">
          <h2 className="text-2xl font-bold mb-6">Cadastrar</h2>

          {/* Formulário */}
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="text"
              placeholder="Usuário"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-11/12 x-4 py-3 rounded-full border-none text-center font-bold bg-white text-black focus:outline-none focus:ring-2 focus:ring-[#f1d369] marginlogin1 h-10"
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-11/12 x-4 py-3 rounded-full border-none text-center font-bold bg-white text-black focus:outline-none focus:ring-2 focus:ring-[#f1d369] marginlogin h-10"
            />
            <input
              type="tel"
              placeholder="Número de telefone (opcional)"
              pattern="^\(?\d{2}\)? ?9?\d{4}-?\d{4}$"
              value={tel}
              onChange={(e) => setTel(e.target.value)}
              className="w-11/12 x-4 py-3 rounded-full border-none text-center font-bold bg-white text-black focus:outline-none focus:ring-2 focus:ring-[#f1d369] marginlogin h-10"
            />
            <input
              type="cpf"
              placeholder="Número CPF"
              pattern="/^([0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}|[0-9]{2}\.?[0-9]{3}\.?[0-9]{3}\/?[0-9]{4}\-?[0-9]{2})$/"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              className="w-11/12 x-4 py-3 rounded-full border-none text-center font-bold bg-white text-black focus:outline-none focus:ring-2 focus:ring-[#f1d369] marginlogin h-10"
            />
            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-11/12 px-4 py-3 rounded-full border-none text-center font-bold bg-white text-black focus:outline-none focus:ring-2 focus:ring-[#f1d369] marginlogin h-10"
            />
            <input
              type="password"
              placeholder="Confirmar Senha"
              value={passwordcon}
              onChange={(e) => setPasswordcon(e.target.value)}
              className="w-11/12 px-4 py-3 rounded-full border-none text-center font-bold bg-white text-black focus:outline-none focus:ring-2 focus:ring-[#f1d369] marginlogin h-10"
            />
            <button
              type="submit"
              className="w-10/12 py-3 rounded-full bg-[#a0a08b] font-bold text-gray-800 hover:bg-[#f1d369] transition ease-in-out marginlogin h-10"
            >
              Cadastrar
            </button>
          </form>

          {/* Links */}
          <div className="mt-4 text-sm">
            <Link
              to="/forgot"
              className="block text-blue-300 hover:text-white transition ease-in-out margin-3"
            >
              Esqueci a Senha
            </Link>
            <Link
              to="/ProjetoMLTumor/frontend/build"
              className="block mt-2 text-blue-300 hover:text-white transition ease-in-out"
            >
              já tem conta? Login
            </Link>
            {message && <p className="text-sm mt-4">{message}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
