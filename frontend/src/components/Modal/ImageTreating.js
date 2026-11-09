import React, { useState } from "react";
import image from "../assets/LumorLogo.png";

const ImageTreating = ({ onClose }) => {
  const [finalLabel, setFinalLabel] = useState("");
  const [finalRes, setFinalRes] = useState("");
  const [file, setFile] = useState(null);
  const [uploadError, setUploadError] = useState(null);
  const [imageUpload, setImageUpload] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!file) {
      setUploadError("Nenhum arquivo selecionado.");
      return;
    } else {
      const url = URL.createObjectURL(file);
      setImageUpload(url);
    }

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        if (result.predicted_label === "healthy") {
          setFinalLabel("Não Tumor");
        } else {
          setFinalLabel(result.predicted_label || "Sem Resultado");
        }
        setFinalRes(result.predicted_probability + "%" || "0.00%");
        setUploadError(null);
      } else {
        setUploadError("Erro no upload: " + response.statusText);
      }
    } catch (error) {
      setUploadError("Erro ao enviar a requisição: " + error.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-[#011f26]/90 flex items-center justify-center z-50 p-4">
      <div className="rounded-lg max-w-6xl w-full h-[60vh] border-1 border-[#f1d369] overflow-y-auto shadow-2xl p-8 flex flex-col md:flex-row gap-10 relative transition-all duration-300">
        {/* Botão fechar */}
        <button
          onClick={onClose}
          aria-label="Fechar modal"
          className="absolute top-4 right-4 text-[#f1d369] text-3xl font-bold hover:text-orange-400 transition-colors cursor-pointer"
        >
          &times;
        </button>

        {/* Lado esquerdo */}
        <div className="flex-1 flex flex-col items-center gap-6">
          <img
            src={imageUpload || image}
            alt="Preview"
            className="max-w-full max-h-80 rounded-md shadow-md object-contain bg-[#011f26] mt-8"
          />

          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full"
          >
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
              id="submit"
              className="bg-[#f1d369] text-[#011f26] font-bold text-lg rounded-lg px-12 py-4 shadow-md hover:bg-[#d4c260] hover:-translate-y-1 hover:shadow-lg transition-all duration-200 cursor-pointer"
            >
              Enviar
            </button>
          </form>

          <div className="text-center">
            <p className="text-[#f1d369] font-bold mb-1">AVISO!!</p>
            <p className="text-[#81817b] text-sm max-w-md">
              Caso a imagem inserida não condiza a um cérebro, o programa não
              apresentará os resultados desejados e portanto quaisquer
              resultados apresentados pelo mesmo deverão ser desconsiderados
            </p>
          </div>

          {uploadError && (
            <p
              className="text-red-500 font-semibold mt-4 transition-all duration-500 ease-out"
              style={{
                opacity: uploadError ? 1 : 0,
                transform: uploadError ? "translateY(0)" : "translateY(-10px)",
              }}
            >
              {uploadError}
            </p>
          )}
        </div>

        {/* Lado direito - só aparece se houver resultado */}
        {finalLabel && finalRes && (
          <aside className="flex-1 flex flex-col items-center justify-center text-center">
            <div className="bg-[#022d4a] rounded-lg shadow-xl w-full max-w-[45vh] max-h-[24vh] p-4">
              <h2 className="text-[#f1d369] text-xl font-semibold">
                De acordo com a análise, a imagem apresenta:
              </h2>
              <h1
                id="finalLabel"
                className="text-gray-100 text-4xl font-extrabold mb-6 drop-shadow-lg"
              >
                {finalLabel}
              </h1>
              <h3 className="text-[#f1d369] text-lg mb-2">
                Com uma certeza de
              </h3>
              <h1
                id="finalRes"
                className="text-[#f1d369] text-6xl font-extrabold mb-8 drop-shadow-lg"
              >
                {finalRes}
              </h1>
              <p className="text-[#81817b] text-sm">
                Lembre-se sempre que o diagnóstico final deve ser feito por um
                médico especialista na área. A IA pode falhar.
              </p>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
};

export default ImageTreating;
