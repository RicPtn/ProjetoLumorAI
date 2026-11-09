import React from "react";
import {Link} from "react-router-dom";

const ModalLogout = ({setIsLogoutOpen}) => {
    return (
      <div className="fixed inset-0 z-9999 flex items-center justify-center bg-[#011f26]/90">
        <div className="bg-[#011f26] text-white rounded-2xl flex flex-col p-6 mb-2 justify-between min-h-[100px] shadow-2xl w-[400px]">
          <p className="text-gray-200 mb-6 text-center">
            Tem certeza que deseja sair?
          </p>

          <div className="flex justify-center gap-16">
            <Link
              className="bg-gray-300 cursor-pointer hover:bg-gray-400 text-gray-900 text-center px-4 py-2 rounded-md transition-all w-10"
              to="/logout"
            >
              Sim
            </Link>
            <button
              onClick={() => setIsLogoutOpen(false)}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition-all w-10"
            >
              Não
            </button>
          </div>
        </div>
      </div>
    );
   
};

export default ModalLogout;