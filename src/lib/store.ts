import recipeDataSource from "@/orm/datasources/recipeDataSource";
import { Recipe } from "@/orm/entities/recipe";
import { GoogleUser } from "@/types";
import { atom, createStore } from "jotai";
import { getUserFromLocalStorage } from "./googleAuth";

export async function getFavorites() {
  try {
    const recipes = await recipeDataSource.dataSource.manager
      .createQueryBuilder(Recipe, "recipe")
      .getMany();
    return recipes;
  } catch (error: any) {
    return [];
  }
}

export const favoritesAtom = atom<Recipe[] | null>(null);
export const googleUserAtom = atom<GoogleUser | null>(
  getUserFromLocalStorage()
);
export const store = createStore();
