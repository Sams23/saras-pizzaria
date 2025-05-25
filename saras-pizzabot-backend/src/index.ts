import express from "express";
import cors from "cors";
import { AppDataSource } from "./database/data-source";
import messageRoutes from "./routes/messages";

const app = express();

app.use(cors());
app.use(express.json());

// Aqui sim usamos o router corretamente
app.use("/messages", messageRoutes);

AppDataSource.initialize()
  .then(() => {
    console.log("Banco de dados conectado com sucesso!");
    app.listen(3001, () =>
      console.log("Servidor rodando em http://localhost:3001")
    );
  })
  .catch((err) => console.error("Erro ao conectar banco de dados:", err));
