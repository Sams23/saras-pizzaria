import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from "typeorm";

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  sender!: "user" | "bot";

  @Column()
  text!: string;

  @CreateDateColumn()
  timestamp!: Date;
}
