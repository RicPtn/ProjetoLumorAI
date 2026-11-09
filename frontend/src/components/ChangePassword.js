import React, { useState, useEffect } from "react";
import image from "./assets/LumorLogo.png";
import { useNavigate } from "react-router-dom";
function ChangePassword() {
  const [password, setPassword] = useState("");
  const [passwordcon, setPasswordcon] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate(); // hook do React Router
  useEffect(() => {
    const handleInvalidSession = async () => {
      const response = await fetch(
        "http://localhost/ProjetoMLTumor/backend/PHP/screens/novasenha.php",
        {
          credentials: "include",
          mode: "cors",
        }
      );

      const result = await response.text();
      setMsg(result);
      if (result.includes("undefined")) {
        navigate("/logout");
      }
    };
    handleInvalidSession();
  }, [navigate]);

  const NewPass = async (e) => {
    e.preventDefault();

    const response = await fetch(
      "http://localhost/ProjetoMLTumor/backend/PHP/screens/novasenha.php",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        credentials: "include",
        body: new URLSearchParams({
          password: password,
          passwordcon: passwordcon,
        }),
      }
    );

    const result = await response.text();
    setMsg(result);

    if (result.length > 0) {
      switch (result) {
        case "defined": {
          navigate("/ProjetoMLTumor/frontend/build");
          break;
        }
        case "As senhas não batem.": {
          setMsg("As senhas não batem.");
          break;
        }
        default: {
          setMsg("Erro 404");
        }
      }
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
          <h2 className="text-2xl font-bold mb-6">Mudar Senha</h2>

          {/* Formulário */}
          <form onSubmit={NewPass} className="space-y-4">
            <input
              type="password"
              placeholder="Nova Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-11/12 x-4 py-3 rounded-full border-none text-center font-bold bg-white text-black focus:outline-none focus:ring-2 focus:ring-[#f1d369] marginlogin1 h-10"
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
              Salvar nova senha
            </button>
          </form>
          {msg !== "defined" && <p className="text-sm mt-4">{msg}</p>}
        </div>
      </div>
    </div>
  );
}

export default ChangePassword;
