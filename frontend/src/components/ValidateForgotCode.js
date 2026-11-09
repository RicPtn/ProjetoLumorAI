import React, { useEffect, useState } from "react";
import "../App.css";
import image from "./assets/LumorLogo.png";
import { useNavigate } from "react-router-dom";

function Timer() {
  const starttime = 600;
  const [temporestante, setTempoRestante] = useState(starttime);

  useEffect(() => {
    if (temporestante <= 0) return;

    const intervalo = setInterval(() => {
      setTempoRestante((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(intervalo);
  }, [temporestante]);
  const formatarTempo = (secs) => {
    const min = String(Math.floor(secs / 60)).padStart(2, "0");
    const sec = String(secs % 60).padStart(2, "0");
    return `${min}:${sec}`;
  };
  return <span>Seu código expira em {formatarTempo(temporestante)}</span>;
}

function ValidateForgotCode() {
  const [expirado, setExpirado] = useState(false);
  const [code, setCode] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const resendCode = async (e) => {

    const resendresponse = await fetch(
      "http://localhost/ProjetoMLTumor/backend/PHP/screens/resendcode.php",
      {
        credentials: "include",
        mode: "cors",
      }
    );
    const resendresult = await resendresponse.text();
    setMsg(resendresult);
    if (resendresult.includes("Sessão inválida")) {
      setExpirado(true);
    }
  };
  const validateCode = async (e) => {
    e.preventDefault();


    const response = await fetch(
      "http://localhost/ProjetoMLTumor/backend/PHP/screens/vefcode.php",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        credentials: "include",
        body: new URLSearchParams({
          code: code,
        }),
      }
    );
    const result = await response.text();
    setMsg(result);
    if (result.includes("verified")) {
      navigate("/changepass");
    } else if (result.includes("Código expirado.")) {
      setExpirado(true);
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
          <h2 className="text-2xl font-bold mb-6">Validar Código</h2>

          {/* Formulário */}
          <form onSubmit={validateCode} className="space-y-4">
            <input
              type="text"
              placeholder="Código"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-11/12 x-4 py-3 rounded-full border-none text-center font-bold bg-white text-black focus:outline-none focus:ring-2 focus:ring-[#f1d369] marginlogin1 h-10"
            />

            <button
              type="submit"
              className="w-10/12 py-3 rounded-full bg-[#a0a08b] font-bold text-gray-800 hover:bg-[#f1d369] transition ease-in-out marginlogin h-10"
            >
              Validar Codigo
            </button>
          </form>

          {/* Links */}
          <div className="mt-4 text-sm">
            <a
              href="#"
              onClick={() => {
                resendCode();
              }}
              className="block text-blue-300 hover:text-white transition ease-in-out margin-3"
            >
              Reenviar Código
            </a>
            <p className="block mt-2 text-blue-300 ">
              {expirado ? "Código expirado." : <Timer />}
            </p>
            {msg != "Código expirado." && <p className="text-sm mt-4">{msg}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ValidateForgotCode;
