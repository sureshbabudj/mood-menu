import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1731418623060 implements MigrationInterface {
  name = "InitRecipeTable1731418623060";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS recipe (
        idMeal VARCHAR PRIMARY KEY,
        strMeal TEXT NOT NULL,
        strMealThumb TEXT NOT NULL,
        userTried BOOLEAN NOT NULL DEFAULT 0
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS recipe`);
  }
}
