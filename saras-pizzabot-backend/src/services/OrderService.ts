import { AppDataSource } from "../database/data-source";
import { Order } from "../models/Order";

const orderRepo = AppDataSource.getRepository(Order);

export async function criarNovoPedido(): Promise<Order> {
  const novo = orderRepo.create({ etapa: "pizza" });
  return await orderRepo.save(novo);
}

export async function obterUltimoPedido(): Promise<Order | null> {
  const pedidos = await orderRepo.find({
    order: { createdAt: "DESC" },
    take: 1,
  });

  return pedidos[0] || null;
}

export async function atualizarPedido(
  id: number,
  etapa: Partial<Order>
): Promise<Order> {
  await orderRepo.update(id, etapa);
  return (await orderRepo.findOneBy({ id }))!;
}
