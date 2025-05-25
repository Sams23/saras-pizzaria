import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from "typeorm";

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  pizza!: string;

  @Column({ nullable: true })
  bebida!: string;

  @Column({ nullable: true })
  sobremesa!: string;

  @Column({ default: "pizza" })
  etapa!: "pizza" | "bebida" | "sobremesa" | "finalizado";

  @CreateDateColumn()
  createdAt!: Date;
}
