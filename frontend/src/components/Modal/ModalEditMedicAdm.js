import {React, useState, useEffect} from "react";


async function fetchDataforEdit(){
  const response = await fetch(
    "http://localhost/ProjetoMLTumor/backend/PHP/functions/getMedicData.php",
    {
      credentials: "include",
      mode: "cors",
    }
  );
  const result = await response.text();

  try {
    const data = JSON.parse(result);

    return data.map((item) => ({
      name: item.usuario_medico,
      email: item.email_medico,
      telefone: item.telefone_medico,
      crm: item.crm_medico,
      cpf: item.cpf_medico,
    }));
  } catch (error) {
    console.error("Erro ao processar os dados:", error);
    return [];
  }
};

function ModalUsuario({ setIsOpenEdit }) {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchDataforEdit();
      console.log("Dados recebidos do PHP:", data);
      if (data.length > 0) {
        setUsuario(data[0]);
      }
    };
    loadData();
  }, []);

  if (!usuario) {
    return (
      <div className="fixed inset-0 z-9999 flex items-center justify-center bg-[#011f26]/90">
        <div className="bg-white p-6 rounded-xl w-96 shadow-lg text-center">
          <p>Carregando dados...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center bg-[#011f26]/90">
      <div className="bg-white p-6 rounded-xl w-96 shadow-lg">
        <h2 className="text-lg font-bold mb-4">Detalhes do Usuário</h2>

        <p>
          <strong>Usuário:</strong> {usuario.name}
        </p>
        <p>
          <strong>Senha: *******</strong>
        </p>
        <p>
          <strong>Telefone:</strong> {usuario.telefone}
        </p>
        <p>
          <strong>Email:</strong> {usuario.email}
        </p>
        <p>
          <strong>CRM:</strong> {usuario.crm}
        </p>
        <p>
          <strong>CPF:</strong> {usuario.cpf}
        </p>
        <button
          onClick={() => setIsOpenEdit(false)}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Fechar
        </button>
      </div>
    </div>
  );
}

export default ModalUsuario;