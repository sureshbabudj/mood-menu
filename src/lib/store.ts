import recipeDataSource from "@/orm/datasources/recipeDataSource";
import { Recipe } from "@/orm/entities/recipe";
import { atom, createStore } from "jotai";
import { Session } from "@supabase/supabase-js";

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
export const sessionAtom = atom<Session | null>(null);
export const store = createStore();
