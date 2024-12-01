import { atom, createStore } from "jotai";
import { Session } from "@/types";
import { RecipeWithId } from "@/orm/recipe.collection";

export const favoritesAtom = atom<RecipeWithId[] | null>(null);
export const sessionAtom = atom<Session | null>(null);
export const store = createStore();
