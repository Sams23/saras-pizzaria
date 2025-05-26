# Sara's Pizzaria 🍕

Um sistema de atendimento com inteligência artificial para pizzarias, desenvolvido com React, Node.js e SQLite.  
Simula um atendente virtual capaz de conduzir um pedido de forma guiada e natural.

---

## 📂 Estrutura do Projeto

SarasPizzaria/

├── saras-pizzabot-backend/
│   ├── src/
│   ├── pizzabot.sqlite
│   └── package.json

├── saras-pizzabot-frontend/
│   ├── src/
│   └── package.json
├── README.md
└── .gitignore

---

## ✅ Funcionalidades

### 🔹 Backend

- API REST com:
  - `POST /messages`: recebe uma mensagem e responde com inteligência artificial
  - `GET /messages`: retorna o histórico de mensagens
- Banco de dados SQLite (via TypeORM)
- Lógica de IA estruturada para:
  - Seguir etapas: pizza → bebida → sobremesa
  - Insistir educadamente apenas uma vez
  - Proibir itens fora do cardápio (ex: hambúrguer, promoções)
- Estrutura organizada em camadas:
  - `controllers/`, `services/`, `models/`, `utils/`

### 🔹 Frontend

- Interface de chat funcional com React
- Exibição do histórico de mensagens
- Botão "Novo Pedido" para reiniciar o fluxo
- Botão "Salvar Pedido" para exportar o resumo do pedido
- Scroll automático e input com foco contínuo
- Estilização moderna e limpa
- Ícone de pizza (favicon) e título "Sara's Pizzaria"

---

## 🤖 Regras de atendimento da IA

- ✅ Oferece apenas itens do cardápio: pizzas, bebidas e sobremesas
- ✅ Segue a ordem: pizza → bebida → sobremesa
- ✅ Insiste no item adicional somente uma vez (se recusado)
- ✅ Se o cliente disser “não” duas vezes, segue para a próxima etapa
- 🚫 Não oferece promoções, cupons, brindes ou itens não listados

---

## ▶️ Como executar o projeto

### Pré-requisitos:

- [Node.js](https://nodejs.org/)  (versão 18 ou superior)
- npm (gerenciador de pacotes que vem com o Node)

---

### 1. Clone o repositório

```bash
git clone [https://github.com/Sams23/saras-pizzaria.git]
cd SarasPizzaria
```
  📌 O backend será iniciado em http://localhost:3001
  🧠 O banco de dados (pizzabot.sqlite) será criado automaticamente após o primeiro uso, na pasta saras-pizzabot-backend/.
  ⚠️ Se receber erro relacionado ao ts-node-dev, instale globalmente com:
  
    npm install -g ts-node-dev

### 2. Instale e execute o backend

```bash
cd saras-pizzabot-backend
npm install
npm run dev
```
  📌 O frontend será iniciado em http://localhost:3000

### 3. Instale e execute o frontend

```bash
cd saras-pizzabot-frontend
npm install
npm start
```

🌐 Acesse:
http://localhost:3000

---

##  🛠 Tecnologias utilizadas

🔹 Frontend: React, TypeScript, Axios
🔹 Backend: Node.js, Express, TypeORM, SQLite
🔹 Extras: REST Client, lógica de IA simples com persistência

---

## ✨ Autor(a)

Sara Mendonça  
Contato: sm.saramendonca@gmail.com
LinkedIn: [linkedin.com/in/saramendonca](https://linkedin.com/in/saramendonca)
