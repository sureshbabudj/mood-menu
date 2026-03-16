import { auth, db } from "@/lib/firebaseClient";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  QueryDocumentSnapshot,
  getDoc,
  query,
  where,
  Firestore,
} from "firebase/firestore";

export type Recipe = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  uid: string;
};

export type RecipeWithId = Recipe & { id: string };

export const converter = <T>() => ({
  toFirestore: (data: T) => data,
  fromFirestore: (snap: QueryDocumentSnapshot) =>
    ({
      id: snap.id,
      ...snap.data(),
    } as T & { id: string }),
});

const recipeConverter = converter<Recipe>();

const getRecipesCollection = () => {
  if (!db) throw new Error("Firestore is not initialized");
  return collection(db as Firestore, "recipes").withConverter(recipeConverter);
};

export const getCurrentUserRecipes = async (): Promise<RecipeWithId[]> => {
  if (!auth?.currentUser?.uid) throw new Error("user not authenticated");
  const recipesCollection = getRecipesCollection();
  const currentUserUid = auth.currentUser.uid;
  const q = query(recipesCollection, where("uid", "==", currentUserUid));
  const querySnapshot = await getDocs(q);
  const recipes = querySnapshot.docs.map((doc) => doc.data() as RecipeWithId);
  return recipes;
};

export const addRecipe = async (recipe: Recipe) => {
  if (!auth?.currentUser?.uid) throw new Error("user not authenticated");
  const recipesCollection = getRecipesCollection();
  const currentUserUid = auth.currentUser.uid;
  return addDoc(recipesCollection, { ...recipe, uid: currentUserUid });
};

export const deleteRecipe = async (id: string) => {
  if (!auth?.currentUser?.uid) throw new Error("user not authenticated");
  const recipesCollection = getRecipesCollection();
  const currentUserUid = auth.currentUser.uid;
  const recipeDoc = doc(recipesCollection, id);
  const docSnap = await getDoc(recipeDoc);
  if (docSnap.exists() && docSnap.data().uid === currentUserUid) {
    return deleteDoc(recipeDoc);
  } else {
    throw new Error("Permission denied or document does not exist");
  }
};

export const updateRecipe = async (
  id: string,
  updatedData: Partial<Recipe>
) => {
  if (!auth?.currentUser?.uid) throw new Error("user not authenticated");
  const recipesCollection = getRecipesCollection();
  const currentUserUid = auth.currentUser.uid;
  const recipeDoc = doc(recipesCollection, id);
  const docSnap = await getDoc(recipeDoc);
  if (docSnap.exists() && docSnap.data().uid === currentUserUid) {
    return updateDoc(recipeDoc, updatedData);
  } else {
    throw new Error("Permission denied or document does not exist");
  }
};

export const getRecipe = async (id: string): Promise<RecipeWithId | null> => {
  if (!auth?.currentUser?.uid) throw new Error("user not authenticated");
  const recipesCollection = getRecipesCollection();
  const currentUserUid = auth.currentUser.uid;
  const recipeDoc = doc(recipesCollection, id);
  const docSnap = await getDoc(recipeDoc);
  if (docSnap.exists() && docSnap.data().uid === currentUserUid) {
    return { id: docSnap.id, ...docSnap.data() } as RecipeWithId;
  } else {
    return null;
  }
};
