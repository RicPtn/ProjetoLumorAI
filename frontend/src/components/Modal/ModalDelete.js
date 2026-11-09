import React from "react";

export default function ModalDelete({ email, onClose, onConfirm }) {
  if (!email) return null;

  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center bg-[#011f26]/90">
      <div className="bg-[#011f26] text-white rounded-2xl p-6 shadow-2xl w-[400px] border border-orange-400">
        <h2 className="text-2xl font-semibold mb-3 text-orange-400 text-center">
          Excluir Médico
        </h2>
        <p className="text-gray-200 mb-6 text-center">
          Tem certeza que deseja excluir o médico com e-mail:
          <br />
          <span className="text-orange-300 font-medium">{email}</span>?
        </p>

        <div className="flex justify-center gap-4">
          <button
            onClick={onClose}
            className="bg-gray-300 hover:bg-gray-400 text-gray-900 px-4 py-2 rounded-md transition-all"
          >
            Cancelar
          </button>
          <button
            onClick={() => onConfirm(email)}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition-all"
          >
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
}
