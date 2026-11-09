import { React, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ModalUsuario from "./Modal/ModalUsuario";
import ModalMedic from "./Modal/ModalMedic";
import ModalDeletePaciente from "./Modal/ModalDeletePaciente";
import ModalLogout from "./Modal/ModalLogout";
import ModalPaciente from "./Modal/ModalInfoPaciente";

function MedicDash() {
  const [isOpenPaciente, setIsOpenPaciente] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isUserOpen, setIsUserOpen] = useState(false);
  const [pacienteSelecionado, setPacienteSelecionado] = useState(null);

  const [pacientes, setPacientes] = useState([]);
  const [termoPesquisa, setTermoPesquisa] = useState("");
  const [emailUser, setEmailUser] = useState("");
  const [deleteCpf, setDeleteCpf] = useState(null);
  const [isDeleteCpfOpen, setIsDeleteCpfOpen] = useState(false);
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);

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
      console.log("RAW RESULT >>>", result);
      
      if (result.includes("Usuário não autenticado")) {
        navigate("/logout");
        return;
      }
      
      try {
        const data = JSON.parse(result);
        
        const mappedData = data.pacientes.map((item) => ({
          name: item.nome_paciente || "Paciente Desconhecido",
          emailpaciente: item.email_paciente,
          pacientCPF: item.paciente_cpf || "",
          date: formatDate(item.data_hora),
          lastEdit: formatDate(item.data_edicao),
          obs: item.observacoes || "",
          image: item.imagem || "",
        }));
        
        setPacientes(mappedData);
        setEmailUser(data.sessEmail || "");
      } catch (error) {
        console.error("Erro ao processar:", error);
        setPacientes([]);
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

  const PacientesFiltrados = pacientes.filter((p) =>
    p.name.toLowerCase().includes(termoPesquisa.toLowerCase())
  );

  const deletarPaciente = async (cpf) => {
    try {
      const response = await fetch(
        "http://localhost/ProjetoMLTumor/backend/PHP/functions/deletePaciente.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ cpf }),
        }
      );

      const result = await response.json();

      if (result.sucesso) {
        alert("Paciente excluído com sucesso!");
        setIsDeleteCpfOpen(false);
        setDeleteCpf(null);
      } else {
        alert(result.erro || "Erro ao excluir paciente.");
      }
    } catch (error) {
      console.error("Erro ao excluir:", error);
      alert("Falha na requisição.");
    }
  };

  const abrirModalDeleteCpf = (cpf) => {
    console.log("Abrindo modal para:", cpf);
    setDeleteCpf(cpf);
    setIsDeleteCpfOpen(true);
  };
  const OpenUsuario = async () => {
    setIsUserOpen(true);
  };

  return (
    <div className="flex h-screen w-screen font-sans">
      <div className="w-70 bg-[#011f26] text-white flex flex-col items-center justify-between py-5">
        <div>
          <div className="text-3xl mb-4">
            <button
              onClick={() => setIsUserOpen(true)}
              className="p-2 rounded-full transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-80 cursor-pointer"
            >
              👤
            </button>
          </div>
        </div>

        <div className="flex flex-col justify-between">
          <a
            href="/MedicDash"
            className="text-gray-300 underline font-bold transform writing-vertical-lr"
          >
            Pacientes
          </a>
        </div>

        <div>
          <button
            type="button"
            onClick={() => setIsLogoutOpen(true)}
            className="text-1xl cursor-pointer text-orange-400 transition-colors duration-300 ease-in-out hover:text-white"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="w-screen flex flex-col bg-gray-100 overflow-y-auto h-full">
        <div className="flex justify-between items-end mb-4 bg-[#011f26] h-35 shrink-0 px-4 py-2">
          <h2 className="text-xl font-semibold text-white">
            Pacientes: {PacientesFiltrados.length}
          </h2>

          <div className="flex items-center gap-2">
            <button
              className="text-green-600 font-semibold hover:text-white underline transition-opacity duration-300"
              onClick={() => setIsAddOpen(true)}
            >
              Novo Paciente
            </button>

            <button className="text-xl">🔍</button>
            <input
              type="text"
              placeholder="Pesquisar Paciente..."
              value={termoPesquisa}
              onChange={(e) => setTermoPesquisa(e.target.value)}
              className="px-2 py-1 border rounded border-orange-400 text-white text-3xl"
            />
          </div>
        </div>

        <div className="flex flex-col gap-3 p-4">
          {PacientesFiltrados.map((p, i) => (
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
                  className="hover:text-gray-600 cursor-pointer transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-110"
                  onClick={() => abrirModalDeleteCpf(p.pacientCPF)}
                >
                  🗑️
                </button>
                <button
                  className="hover:text-gray-600 cursor-pointer transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-110"
                  onClick={() => {
                    setIsOpenPaciente(true);
                    setPacienteSelecionado(p);
                  }}
                >
                  📋
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {isOpenPaciente && (
        <ModalPaciente
          setIsOpenPaciente={setIsOpenPaciente}
          paciente={pacienteSelecionado}
        />
      )}
      {isAddOpen && <ModalMedic setIsAddOpen={setIsAddOpen} />}
      {isLogoutOpen && <ModalLogout setIsLogoutOpen={setIsLogoutOpen} />}
      {isUserOpen && (
        <ModalUsuario setIsUserOpen={setIsUserOpen} usuario={emailUser} />
      )}
      {isDeleteCpfOpen && (
        <ModalDeletePaciente
          cpf={deleteCpf}
          onClose={() => {
            setIsDeleteCpfOpen(false);
            setDeleteCpf(null);
          }}
          onConfirm={deletarPaciente}
        />
      )}
    </div>
  );
}

export default MedicDash;
