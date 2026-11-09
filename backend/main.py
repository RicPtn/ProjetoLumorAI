from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.utils import secure_filename
import os

from ModelLogic.Predictions import predict_image_with_model

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = os.path.join(os.getcwd(), "temp")
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route('/upload', methods=['POST'])
def uploads():
    try:
        if 'image' not in request.files:
            return jsonify({"error": "Nenhum arquivo enviado"}), 400

        file = request.files['image']

        if not file or not file.filename:
            return jsonify({"error": "Nenhum arquivo selecionado"}), 400

        # Força o tipo como string com cast seguro
        filename = secure_filename(str(file.filename))

        temp_path = os.path.join(UPLOAD_FOLDER, filename)
        file.save(temp_path)

        try:
            result = predict_image_with_model(temp_path)
        except Exception as e:
            return jsonify({"error": f"Erro ao processar a imagem: {str(e)}"}), 500
        finally:
            if os.path.exists(temp_path):
                os.remove(temp_path)

        return jsonify(result)

    except Exception as e:
        return jsonify({"error": f"Erro no servidor: {str(e)}"}), 500


if __name__ == '__main__':
    app.run(debug=True)
