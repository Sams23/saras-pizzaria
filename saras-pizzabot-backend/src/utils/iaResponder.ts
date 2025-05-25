import { Order } from "../models/Order";

const menu = {
  pizzas: ["Margherita", "Calabresa", "Portuguesa", "Quatro Queijos"],
  bebidas: ["Coca-Cola", "Suco de Laranja", "Água"],
  sobremesas: ["Brownie", "Pudim", "Sorvete"],
};

const negativas = [
  "não",
  "nao",
  "nada",
  "só isso",
  "so isso",
  "tá bom",
  "ta bom",
  "mais nada",
];
const proibidos = [
  "hamburguer",
  "hambúrguer",
  "lanche",
  "cupom",
  "promoção",
  "brinde",
  "desconto",
];

const persuasivas = [
  "Essa é uma das mais pedidas!",
  "Uma ótima escolha, saborosa e muito elogiada!",
  "Tem tudo para agradar seu paladar!",
  "É uma das favoritas entre nossos clientes.",
  "Você vai adorar essa opção!",
];

function escolherPersuasiva(): string {
  const index = Math.floor(Math.random() * persuasivas.length);
  return persuasivas[index];
}

function sugerirOutro(itemAtual: string, grupo: string[]): string | null {
  const alternativas = grupo.filter(
    (i) => i.toLowerCase() !== itemAtual.toLowerCase()
  );
  return alternativas.length
    ? alternativas[Math.floor(Math.random() * alternativas.length)]
    : null;
}

export function iaResponder(
  texto: string,
  pedido: Order
): { resposta: string; pedidoAtualizado: Partial<Order> } {
  const msg = texto.toLowerCase();
  const atual: Partial<Order> = {};

  // Itens proibidos
  if (proibidos.some((p) => msg.includes(p))) {
    return {
      resposta:
        "Desculpe, só trabalhamos com pizzas, bebidas e sobremesas listadas no nosso cardápio. Posso te mostrar algumas opções deliciosas? 🍕",
      pedidoAtualizado: {},
    };
  }

  // Recusa
  if (negativas.some((n) => msg.includes(n))) {
    // Etapa: bebida
    if (pedido.etapa === "bebida") {
      if (!pedido.bebida || pedido.bebida === "nenhuma") {
        return {
          resposta: "Tudo certo! Vamos seguir para a sobremesa. 🍮",
          pedidoAtualizado: { etapa: "sobremesa", bebida: "nenhuma" },
        };
      } else {
        const sugestao = sugerirOutro(pedido.bebida, menu.bebidas);
        return {
          resposta: sugestao
            ? `Tudo bem! Mas talvez um ${sugestao} caia bem com a pizza. 😉`
            : "Tudo certo! Podemos seguir sem bebida.",
          pedidoAtualizado: { bebida: "nenhuma" },
        };
      }
    }

    // Etapa: sobremesa
    if (pedido.etapa === "sobremesa") {
      if (!pedido.sobremesa || pedido.sobremesa === "nenhuma") {
        return {
          resposta: "Pedido finalizado! 🍕 Obrigado por escolher a gente!",
          pedidoAtualizado: { etapa: "finalizado", sobremesa: "nenhuma" },
        };
      } else {
        const sugestao = sugerirOutro(pedido.sobremesa, menu.sobremesas);
        return {
          resposta: sugestao
            ? `Sem problemas! Que tal um ${sugestao} então para fechar com chave de ouro? 🍰`
            : "Tudo certo! Podemos finalizar o pedido.",
          pedidoAtualizado: { sobremesa: "nenhuma" },
        };
      }
    }

    // Outras recusas
    return {
      resposta: "Pedido finalizado! 🍕 Obrigado por escolher a gente!",
      pedidoAtualizado: { etapa: "finalizado" },
    };
  }

  // 1. Pizza
  if (pedido.etapa === "pizza") {
    const pizza = menu.pizzas.find((p) => msg.includes(p.toLowerCase()));
    if (pizza) {
      return {
        resposta: `Excelente escolha! ${escolherPersuasiva()} Para beber, temos ${menu.bebidas.join(
          ", "
        )}. Qual você prefere?`,
        pedidoAtualizado: { pizza, etapa: "bebida" },
      };
    }

    return {
      resposta: `Temos os seguintes sabores: ${menu.pizzas.join(
        ", "
      )}. Qual você gostaria hoje?`,
      pedidoAtualizado: {},
    };
  }

  // 2. Bebida
  if (pedido.etapa === "bebida") {
    if (pedido.bebida === "nenhuma") {
      return {
        resposta: `Vamos seguir para a sobremesa. Temos ${menu.sobremesas.join(
          ", "
        )}. Vai querer alguma?`,
        pedidoAtualizado: { etapa: "sobremesa" },
      };
    }

    const bebida = menu.bebidas.find((b) => msg.includes(b.toLowerCase()));
    if (bebida) {
      return {
        resposta: `Perfeito! Para adoçar, temos ${menu.sobremesas.join(
          ", "
        )}. Vai querer alguma?`,
        pedidoAtualizado: { bebida, etapa: "sobremesa" },
      };
    }

    return {
      resposta: `Temos ${menu.bebidas.join(", ")}. Deseja alguma dessas?`,
      pedidoAtualizado: {},
    };
  }

  // 3.Sobremesa
  if (pedido.etapa === "sobremesa") {
    if (pedido.sobremesa === "nenhuma") {
      return {
        resposta: "Pedido finalizado! 🍕 Obrigado por escolher a gente!",
        pedidoAtualizado: { etapa: "finalizado" },
      };
    }

    const sobremesa = menu.sobremesas.find((s) =>
      msg.includes(s.toLowerCase())
    );
    if (sobremesa) {
      return {
        resposta: `Pedido completo! Você escolheu: ${[
          pedido.pizza,
          pedido.bebida,
          sobremesa,
        ]
          .filter(Boolean)
          .join(", ")}. Já vamos preparar tudo! 🍕`,
        pedidoAtualizado: { sobremesa, etapa: "finalizado" },
      };
    }

    return {
      resposta: `Temos ${menu.sobremesas.join(", ")}. Qual delas você prefere?`,
      pedidoAtualizado: {},
    };
  }

  // Finalizado
  return {
    resposta: "Algo mais que eu possa te ajudar hoje? 😉",
    pedidoAtualizado: {},
  };
}
