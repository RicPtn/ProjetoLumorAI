import React from "react";

function ModalPaciente({ setIsOpenPaciente, paciente }) {

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#011f26]/90">
      <div className="bg-white p-6 rounded-xl w-96 shadow-lg">
        <h2 className="text-lg font-bold mb-4">Detalhes do Paciente</h2>

        <p>
          <strong>Nome:</strong> {paciente.name}
        </p>
        <p>
          <strong>Email:</strong> {paciente.emailpaciente}
        </p>
        <p>
          <strong>CPF:</strong> {paciente.pacientCPF}
        </p>
        <button
          onClick={() => setIsOpenPaciente(false)}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Fechar
        </button>
      </div>
    </div>
  );
}

export default ModalPaciente;