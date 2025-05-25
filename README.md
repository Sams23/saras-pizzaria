# Sara's Pizzaria 🍕

Um sistema simples de atendimento com inteligência artificial para pizzarias, construído com Node.js, React e SQLite.

---

## 📂 Estrutura do Projeto

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

- Node.js instalado (v18+)
- npm

---

### 1. Clone o repositório

```bash
git clone [https://github.com/Sams23/saras-pizzaria.git]
cd SarasPizzaria
```

---

## ✨ Autor(a)

Sara Mendonça  
Contato: saramendonca@gmail.com
LinkedIn: [linkedin.com/in/saramendonca](https://linkedin.com/in/saramendonca)
