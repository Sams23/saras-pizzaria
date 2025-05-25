import { DataSource } from "typeorm";
import { Message } from "../models/Message";
import { Order } from "../models/Order";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "./pizzabot.sqlite",
  synchronize: true,
  entities: [Message, Order],
});
