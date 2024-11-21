import { gapi } from "gapi-script";
import { googleUserAtom, store } from "@/lib/store";
import { GoogleUser } from "@/types";

export const saveUserToLocalStorage = (user: any) => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const getUserFromLocalStorage = () => {
  const user = localStorage.getItem("user");
  return user ? (JSON.parse(user) as GoogleUser) : null;
};

export const removeUserFromLocalStorage = () => {
  localStorage.removeItem("user");
};

const SCOPES = "https://www.googleapis.com/auth/drive.appdata";

export const authenticateWithGoogle = async (): Promise<void> => {
  return new Promise((resolve, reject) => {
    gapi.load("client:auth2", async () => {
      await gapi.client.init({
        clientId: "11861962663-4mtsfh5pgrq5voon9tv3dqo6bcrev24u", // OAuth client ID
        scope: SCOPES, // Specify the required scope
      });
      const authInstance = gapi.auth2.getAuthInstance();
      authInstance
        .signIn()
        .then((user: any) => {
          saveUserToLocalStorage(user);
          store.set(googleUserAtom, () => user);
          resolve();
        })
        .catch((error: any) => reject(error));
    });
  });
};

export const uploadToDriveAppDataFolder = async (
  token: string,
  content: string
) => {
  const metadata = {
    name: "favorites.txt",
    parents: ["appDataFolder"], // Save in AppData folder
    mimeType: "text/plain",
  };

  const form = new FormData();
  form.append(
    "metadata",
    new Blob([JSON.stringify(metadata)], { type: "application/json" })
  );
  form.append("file", new Blob([content], { type: "text/plain" }));

  const response = await fetch(
    "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart",
    {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` }, // Only Bearer Token is required
      body: form,
    }
  );

  return response.json();
};
