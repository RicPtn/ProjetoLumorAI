import React from "react";

function Modal({ setIsOpen, usuario }) {
  if (!usuario) return null; // segurança caso não venha nada

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-xl w-96 shadow-lg">
        <h2 className="text-lg font-bold mb-4">Detalhes do Usuário</h2>

        <p><strong>Usuário:</strong> {usuario.username}</p>
        <p><strong>Telefone:</strong> {usuario.telefone}</p>
        <p><strong>Email:</strong> {usuario.email}</p>
        <p><strong>Data de Nascimento:</strong> {usuario.data_nascimento}</p>
        <p><strong>CPF:</strong> {usuario.cpf}</p>
        <p><strong>Tipo:</strong> {usuario.tipo}</p>
        {usuario.tipo === "medico" && (
          <p><strong>CRM:</strong> {usuario.crm}</p>
        )}

        <button
          onClick={() => setIsOpen(false)}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Fechar
        </button>
      </div>
    </div>
  );
}

export default Modal;