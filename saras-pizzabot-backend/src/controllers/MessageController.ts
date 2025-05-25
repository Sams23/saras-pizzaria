import { Request, Response } from "express";
import { AppDataSource } from "../database/data-source";
import { Message } from "../models/Message";
import { Order } from "../models/Order";
import { iaResponder } from "../utils/iaResponder";
import {
  criarNovoPedido,
  obterUltimoPedido,
  atualizarPedido,
} from "../services/OrderService";

const messageRepo = AppDataSource.getRepository(Message);

export async function getMessages(_: Request, res: Response) {
  try {
    const messages = await messageRepo.find({ order: { timestamp: "ASC" } });
    return res.json(messages);
  } catch (err) {
    return res.status(500).json({ error: "Erro ao buscar mensagens" });
  }
}

export async function postMessage(req: Request, res: Response) {
  try {
    const { text } = req.body;

    const userMessage = messageRepo.create({ sender: "user", text });
    await messageRepo.save(userMessage);

    const texto = req.body.text?.toLowerCase() || "";

    let pedido: Order;

    const inicioDePedido = [
      "oi",
      "olá",
      "ola",
      "bom dia",
      "boa tarde",
      "quero pizza",
      "menu",
    ];

    if (inicioDePedido.some((frase) => texto.startsWith(frase))) {
      pedido = await criarNovoPedido();
    } else {
      const ultimo = await obterUltimoPedido();
      if (!ultimo || ultimo.etapa === "finalizado") {
        pedido = await criarNovoPedido();
      } else {
        pedido = ultimo;
      }
    }

    const { resposta, pedidoAtualizado } = iaResponder(text, pedido);
    const botMessage = messageRepo.create({ sender: "bot", text: resposta });

    if (Object.keys(pedidoAtualizado).length > 0) {
      await atualizarPedido(pedido.id, pedidoAtualizado);
    }

    await messageRepo.save(botMessage);

    return res.status(201).json([userMessage, botMessage]);
  } catch (err) {
    console.error("Erro no postMessage:", err);
    return res.status(500).json({ error: "Erro ao salvar mensagem" });
  }
}
