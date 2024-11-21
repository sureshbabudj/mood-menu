import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity("recipe")
export class Recipe {
  @PrimaryColumn()
  idMeal!: string;

  @Column()
  strMeal!: string;

  @Column()
  strMealThumb!: string;

  @Column({ default: false })
  userTried!: boolean;
}
