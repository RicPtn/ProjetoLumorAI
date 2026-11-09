Configuração e Execução
1. Backend (API Python + PHP)
Passo 1: Configurar a API em Python
Navegue para o diretório do backend:

bash

cd backend
Crie e ative o ambiente virtual:

bash

python -m venv venv
source venv/bin/activate  # No Windows: venv\Scripts\activate
Instale as dependências:

bash

pip install -r requirements.txt
Execute a API:

bash

python main.py
A API estará disponível em http://localhost:5000.

Passo 2: Configurar o Backend em PHP
Navegue para o diretório do backend (caso não esteja):

bash

cd backend
Instale as dependências do Composer:

bash

composer install
Execute o servidor PHP:

bash

php -S localhost:8000 -t PHP
O backend estará disponível em http://localhost:8000.

2. Frontend (React + TailwindCSS)
Navegue para o diretório do frontend:

bash

cd frontend
Instale as dependências:

bash

npm install
# ou
yarn install
Inicie o servidor de desenvolvimento:

bash
npm start
# ou
yarn start
O frontend estará disponível em http://localhost:3000.

Execução Completa
Para rodar o projeto completo, execute os três servidores:

API Python: http://localhost:5000

Backend PHP: http://localhost:8000

Frontend React: http://localhost:3000

Certifique-se de que as URLs estão corretamente configuradas no frontend para apontar para o backend e API.