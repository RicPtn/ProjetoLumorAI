import { React, useState } from "react";

const ModalMedic = ({ setIsAddOpen }) => {
  const [pacientecpf, setPacienteCpf] = useState("");
  const [pacienteemail, setPacienteEmail] = useState("");
  const [pacientenome, setPacienteNome] = useState("");
  const [obs, setObs] = useState("");
  const [msg, setMsg] = useState("");
  const [imageUpload, setImageUpload] = useState(null);
  const [file, setFile] = useState(null);

  // Preview + arquivo
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);

    // preview
    if (selectedFile) {
      const previewURL = URL.createObjectURL(selectedFile);
      setImageUpload(previewURL);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("pacientecpf", pacientecpf);
    formData.append("pacientenome", pacientenome);
    formData.append("pacienteemail", pacienteemail);
    formData.append("obs", obs);
    formData.append("imagem", file);

    const response = await fetch(
      "http://localhost/ProjetoMLTumor/backend/PHP/functions/adicionarPaciente.php",
      {
        method: "POST",
        credentials: "include",
        body: formData,
      }
    );

    const result = await response.text();
    setMsg(result);
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.3)]">
        <div className="flex w-full max-w-2xl h-[700px] rounded-xl overflow-hidden shadow-lg bg-[#011f26]">
          <div className="flex items-center justify-center bg-transparent w-full">
            <div className="text-[#f1d369] p-6 rounded-2xl w-11/12 max-w-md text-center">
              <h2 className="text-2xl font-bold mb-6">Cadastrar</h2>

              <form onSubmit={handleRegister} className="space-y-4">
                <input
                  type="text"
                  placeholder="CPF do paciente"
                  value={pacientecpf}
                  onChange={(e) => setPacienteCpf(e.target.value)}
                  className="w-11/12 px-4 py-3 rounded-full border-none text-center font-bold bg-white text-black focus:outline-none focus:ring-2 focus:ring-[#f1d369] marginlogin h-10"
                />
                <input
                  type="text"
                  placeholder="Nome do paciente"
                  value={pacientenome}
                  onChange={(e) => setPacienteNome(e.target.value)}
                  className="w-11/12 px-4 py-3 rounded-full border-none text-center font-bold bg-white text-black focus:outline-none focus:ring-2 focus:ring-[#f1d369] marginlogin h-10"
                />
                <input
                  type="text"
                  placeholder="Email do paciente"
                  value={pacienteemail}
                  onChange={(e) => setPacienteEmail(e.target.value)}
                  className="w-11/12 px-4 py-3 rounded-full border-none text-center font-bold bg-white text-black focus:outline-none focus:ring-2 focus:ring-[#f1d369] marginlogin h-10"
                />

                <input
                  type="text"
                  placeholder="Observações"
                  value={obs}
                  onChange={(e) => setObs(e.target.value)}
                  className="w-11/12 px-4 py-3 rounded-full border-none text-center font-bold bg-white text-black focus:outline-none focus:ring-2 focus:ring-[#f1d369] marginlogin h-10"
                />

                {imageUpload && (
                  <img
                    src={imageUpload}
                    alt="Preview"
                    className="max-w-full max-h-80 rounded-md shadow-md object-contain bg-[#011f26] mt-8"
                  />
                )}

                <label
                  htmlFor="fileInput"
                  className="cursor-pointer bg-[#011f26] text-[#f1d369] font-semibold px-6 py-3 rounded-lg border-2 border-[#f1d369] hover:bg-[#022f3a] hover:scale-105 transition-all duration-200 flex items-center gap-2"
                >
                  📂 Escolher arquivo
                </label>

                <input
                  type="file"
                  id="fileInput"
                  onChange={handleFileChange}
                  accept="image/*,.pdf"
                  className="hidden"
                />

                <button
                  type="submit"
                  className="w-10/12 py-3 rounded-full bg-[#a0a08b] font-bold text-gray-800 hover:bg-[#f1d369] transition ease-in-out marginlogin h-10"
                >
                  Cadastrar novo paciente
                </button>

                <button
                  type="button"
                  onClick={() => setIsAddOpen(false)}
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

export default ModalMedic;
