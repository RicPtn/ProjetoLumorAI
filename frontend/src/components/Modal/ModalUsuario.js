import { React, useState, useEffect } from "react";


async function fetchDataforEdit() {
  const response = await fetch(
    "http://localhost/ProjetoMLTumor/backend/PHP/functions/getAdminData.php",
    {
      credentials: "include",
      mode: "cors",
    }
  );
  const result = await response.text();

  try {
    const data = JSON.parse(result);

    return data.map((item) => ({
      name: item.username,
      email: item.email,
      telefone: item.telefone,
      cpf: item.cpf,
    }));
  } catch (error) {
    console.error("Erro ao processar os dados:", error);
    return [];
  }
}

function ModalUsuario({ setIsUserOpen }) {
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
  
  const handleOutsideClick = (e) => {
    if (e.target === e.currentTarget) {
      setIsUserOpen(false);
    }
  };

  if (!usuario) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/70 backdrop-blur-sm">
        <div className="bg-white p-8 rounded-2xl w-full max-w-sm shadow-2xl text-center animate-pulse">
          <svg className="mx-auto h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="mt-4 text-gray-700 font-semibold">Carregando dados...</p>
        </div>
      </div>
    );
  }

  return (
    <div 
        className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/70 backdrop-blur-sm p-4"
        onClick={handleOutsideClick}
    >
      <div className="bg-white p-3 rounded-2xl w-[45vw] h-[55vh] overflow-y-auto shadow-2xl transform transition-all scale-100 duration-300 flex flex-col justify-between">
        
        
        <div className="space-y-3">
            <h2 className="text-2xl font-extrabold text-gray-900 mb-3 border-b pb-3 border-blue-100">
              👤 Detalhes do Usuário
            </h2>

            <div className="space-y-3 text-gray-700">
              <p className="flex justify-between items-center text-lg">
                <strong className="font-semibold text-gray-800">Usuário:</strong> 
                <span className="text-blue-600 font-medium">{usuario.name}</span>
              </p>
              <p className="flex justify-between items-center text-lg border-t pt-3 border-gray-100">
                <strong className="font-semibold text-gray-800">Telefone:</strong> 
                <span>{usuario.telefone}</span>
              </p>
              <p className="flex justify-between items-center text-lg border-t pt-3 border-gray-100">
                <strong className="font-semibold text-gray-800">Email:</strong> 
                <span>{usuario.email}</span>
              </p>
              <p className="flex justify-between items-center text-lg border-t pt-3 border-gray-100">
                <strong className="font-semibold text-gray-800">CPF:</strong> 
                <span>{usuario.cpf}</span>
              </p>
            </div>
        </div>
        
        <button
          onClick={() => setIsUserOpen(false)}
          className="w-full mt-3 px-4 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-300 "
        >
          Fechar
        </button>
      </div>
    </div>
  );
}

export default ModalUsuario;