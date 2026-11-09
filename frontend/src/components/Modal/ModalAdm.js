import { React, useState } from "react";


const Modal = ({ setIsOpen }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordcon, setPasswordcon] = useState("");
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");
  const [crm, setCrm] = useState("");
  const [cpf, setCpf] = useState("");
  const [msg, setMsg] = useState("");
  const handleLogin = async (e) => {
    e.preventDefault();

    const response = await fetch(
      "http://localhost/ProjetoMLTumor/backend/PHP/functions/registrarMedico.php",
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          username: username,
          password: password,
          passwordcon: passwordcon,
          email: email,
          tel: tel,
          crm: crm,
          cpf: cpf,
        }),
      }
    );
    const result = await response.text();
    setMsg(result);
  };
  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.3)]">
        <div className="flex w-full max-w-2xl h-[700px] rounded-xl overflow-hidden shadow-lg bg-[#011f26]">
          {/* Lado Direito */}
          <div className="flex items-center justify-center bg-transparent w-full">
            <div className="text-[#f1d369] p-6 rounded-2xl w-11/12 max-w-md text-center">
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
                  type="CRM"
                  placeholder="Número CRM"
                  value={crm}
                  onChange={(e) => setCrm(e.target.value)}
                  className="w-11/12 x-4 py-3 rounded-full border-none text-center font-bold bg-white text-black focus:outline-none focus:ring-2 focus:ring-[#f1d369] marginlogin h-10"
                />
                <input
                  type="CPF"
                  placeholder="Número CPF"
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
                  Cadastrar novo médico
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="w-10/12 py-3 rounded-full bg-[#a0a08b] font-bold text-gray-800 hover:bg-[#ff2244] transition ease-in-out marginlogin h-10"
                >
                  Fechar
                </button>
              </form>
              {msg && <p className="text-sm mt-4">{msg}</p>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
