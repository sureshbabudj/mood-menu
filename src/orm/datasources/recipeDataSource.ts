import { DataSource } from "typeorm";
import sqliteParams from "../sqliteParams";
import { Recipe } from "../entities/recipe";
import * as migrations from "../migrations/recipe";

export const DB_NAME = "recipes";

export const dataSourceRecipe = new DataSource({
  name: "recipeConnection",
  type: "capacitor",
  driver: sqliteParams.connection,
  mode: "no-encryption",
  database: DB_NAME,
  version: 1,
  entities: [Recipe],
  logging: ["query", "error", "schema"],
  migrations: migrations,
  subscribers: [],
  synchronize: false, // !!!You will lose all data in database if set to `true`
  migrationsRun: false,
});

const recipeDataSource = {
  dataSource: dataSourceRecipe,
  dbName: DB_NAME,
};

export default recipeDataSource;
