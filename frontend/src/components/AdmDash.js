import { React, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Modal from "./Modal/ModalAdm";
import ModalEdit from "./Modal/ModalEditMedicAdm";
import ImageTreating from "./Modal/ImageTreating";
import ModalUsuario from "./Modal/ModalUsuario";
import ModalDelete from "./Modal/ModalDelete";
import ModalLogout from "./Modal/ModalLogout";

function AdmDash() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [isTestOpen, setIsTestOpen] = useState(false);
  const [isUserOpen, setIsUserOpen] = useState(false);
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [msg, setMsg] = useState("");
  const [medicos, setMedicos] = useState([]);
  const [termoPesquisa, setTermoPesquisa] = useState("");
  const [deleteEmail, setDeleteEmail] = useState(null);
  const [isDeleteEmailOpen, setIsDeleteEmailOpen] = useState(false);
  const [emailUser, setEmailUser] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "http://localhost/ProjetoMLTumor/backend/PHP/screens/dashboard.php",
        {
          credentials: "include",
          mode: "cors",
        }
      );

      const result = await response.text();

      if (result.includes("Usuário não autenticado.")) {
        navigate("/logout");
        return;
      } else {
        
      }

      try {
        const data = JSON.parse(result);
        setEmailUser(data.sessEmail);  // email do admin
        const mappedData = data.medicos.map((item) => ({
          email: item.email || "",
          name: item.nome_medico || "Médico Desconhecido",
          date: formatDate(item.data_hora),
          lastEdit: formatDate(item.data_edicao),
        }));
        setMedicos(mappedData);
        setEmailUser(data.sessEmail);
      } catch (error) {
        console.error("Erro ao processar os dados:", error);
        setMsg("Erro ao carregar dados dos médicos.");
      }
    };

    const formatDate = (timestamp) => {
      if (!timestamp) return "N/A";
      const date = new Date(timestamp);
      return date.toLocaleDateString("pt-BR");
    };

    fetchData();
    const interval = setInterval(fetchData, 2000); 
    return () => clearInterval(interval);
  }, [navigate]);

  // 🔍 Filtro de pesquisa
  const medicosFiltrados = medicos.filter((medico) =>
    medico.name.toLowerCase().includes(termoPesquisa.toLowerCase())
  );

  // 🗑️ Função para deletar médico
  const deletarMedico = async (email) => {
    try {
      const response = await fetch(
        "http://localhost/ProjetoMLTumor/backend/PHP/functions/deleteMedico.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ email }),
        }
      );

      const result = await response.json();

      if (result.sucesso) {
        alert("Médico excluído com sucesso!");
        setMedicos((prev) => prev.filter((m) => m.email !== email));
        setIsDeleteEmailOpen(false);
        setDeleteEmail(null);
      } else {
        alert(result.erro || "Erro ao excluir médico.");
      }
    } catch (error) {
      console.error("Erro ao excluir:", error);
      alert("Falha na requisição.");
    }
  };

 
  const abrirModalDelete = (email) => {
    console.log("Abrindo modal para:", email);
    setDeleteEmail(email);
    setIsDeleteEmailOpen(true);
  };
  const OpenUsuario = async () => {
    setIsUserOpen(true);
  }



  return (
    <div className="flex h-screen w-screen font-sans">
      {/* 🔹 LATERAL */}
      <div className="w-70 bg-[#011f26] text-white flex flex-col items-center justify-between py-5">
        <div>
          <div className="text-3xl mb-4">
            <button
              onClick={() => OpenUsuario()}
              className="p-2 rounded-full transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-80 cursor-pointer"
            >
              👤
            </button>
          </div>
        </div>

        <div className="flex flex-col justify-between">
          <a
            href="/AdmDash"
            className="text-gray-300 underline font-bold writing-vertical-lr"
          >
            Médicos
          </a>
          <button
            type="button"
            onClick={() => setIsTestOpen(true)}
            className="text-gray-300 underline font-bold writing-vertical-lr cursor-pointer bg-transparent border-none p-0"
          >
            Área de testes
          </button>
        </div>

        <div>
          <button type="button" 
          onClick={() => setIsLogoutOpen(true)} 
          className="text-1xl cursor-pointer text-orange-400 transition-colors duration-300 ease-in-out hover:text-white">
            Logout
          </button>
        </div>
      </div>

      {/* 🔹 CONTEÚDO PRINCIPAL */}
      <div className="w-screen flex flex-col bg-gray-100 overflow-y-auto h-full">
        <div className="flex justify-between items-end mb-4 bg-[#011f26] h-35 shrink-0 px-4 py-2">
          <h2 className="text-xl font-semibold text-white">
            Médicos: {medicosFiltrados.length}
          </h2>
          <div className="flex items-center gap-2">
            <button
              className="text-green-600 font-semibold underline cursor-pointer transition-colors duration-300 ease-in-out hover:text-white"
              onClick={() => setIsOpen(true)}
            >
              Novo Médico
            </button>
            <button className="text-xl">🔍</button>
            <input
              type="text"
              placeholder="Pesquisar médico..."
              value={termoPesquisa}
              onChange={(e) => setTermoPesquisa(e.target.value)}
              className="px-2 py-1 border rounded border-orange-400 text-white"
            />
          </div>
        </div>

        {/* 🔹 LISTA DE MÉDICOS */}
        <div className="flex flex-col gap-3 p-4">
          {medicosFiltrados.map((p, i) => (
            <div
              key={i}
              className="bg-white border border-gray-300 rounded-lg p-3 flex justify-between items-center shadow-sm"
            >
              <div>
                <div>
                  <strong>{p.name}</strong> - {p.date}
                </div>
                <div>
                  Último Editado: <strong>{p.lastEdit}</strong>
                </div>
              </div>
              <div className="flex gap-3 text-xl">
                <button
                  className="text-red-600 hover:text-red-800 cursor-pointer transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-110"
                  onClick={() => abrirModalDelete(p.email)}
                >
                  🗑️
                </button>
                <button
                  className="hover:text-gray-600 cursor-pointer transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-110"
                  onClick={() => setIsOpenEdit(true)}
                >
                  📋
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 🔹 MODAIS */}
      {isLogoutOpen && <ModalLogout setIsLogoutOpen={setIsLogoutOpen}/>}
      {isOpen && <Modal setIsOpen={setIsOpen} />}
      {isOpenEdit && <ModalEdit setIsOpenEdit={setIsOpenEdit} />}
      {isTestOpen && <ImageTreating onClose={() => setIsTestOpen(false)} />}
      {isUserOpen && (
        <ModalUsuario setIsUserOpen={setIsUserOpen} usuario={emailUser} />
      )}
      {isDeleteEmailOpen && (
        <ModalDelete
          email={deleteEmail}
          onClose={() => {
            setIsDeleteEmailOpen(false);
            setDeleteEmail(null);
          }}
          onConfirm={deletarMedico}
        />
      )}
    </div>
  );
}

export default AdmDash;
