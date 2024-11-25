import { atom, createStore } from "jotai";
import { Session } from "@supabase/supabase-js";
import { Recipe } from "@/types";

export const favoritesAtom = atom<Recipe[] | null>(null);
export const sessionAtom = atom<Session | null>(null);
export const store = createStore();
