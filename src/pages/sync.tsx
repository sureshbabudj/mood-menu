import React, { useState } from "react";
import { authenticateWithGoogle } from "@/lib/googleAuth";
import { DB_NAME } from "@/orm/datasources/recipeDataSource";

import { CapacitorSQLite } from "@capacitor-community/sqlite";
import { useAtomValue } from "jotai";
import { googleUserAtom } from "@/lib/store";

export const exportDatabase = async (): Promise<Uint8Array> => {
  try {
    const result = await CapacitorSQLite.exportToJson({
      database: DB_NAME,
      jsonexportmode: "full",
    });

    if (result && result.export) {
      console.log("Database exported successfully.");
      const jsonString = JSON.stringify(result.export);
      return new TextEncoder().encode(jsonString);
    } else {
      throw new Error("Failed to export the database.");
    }
  } catch (error) {
    console.error("Error exporting database:", error);
    throw error;
  }
};

export const uploadEncryptedDatabase = async (
  token: string,
  fileName: string,
  encryptedData: Uint8Array
) => {
  const metadata = {
    name: fileName,
    parents: ["appDataFolder"],
  };

  const form = new FormData();
  form.append(
    "metadata",
    new Blob([JSON.stringify(metadata)], { type: "application/json" })
  );
  form.append(
    "file",
    new Blob([encryptedData], { type: "application/octet-stream" })
  );

  const response = await fetch(
    "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: form,
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to upload file: ${response.statusText}`);
  }

  const result = await response.json();
  console.log("File uploaded successfully:", result);
};

const GoogleSignInPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const googleUser = useAtomValue(googleUserAtom);

  const handleSignIn = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await authenticateWithGoogle();
      // console.log("Bearer Token:", bearerToken);
      // const db = await exportDatabase();
      // await uploadEncryptedDatabase(bearerToken, "moodmenu", db);
    } catch (err: any) {
      setError("Failed to sign in. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full  bg-muted shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Sign in with Google
        </h1>
        <p className="text-gray-600 mb-6 text-center">
          We use your Google account to sync your favorite recipes across your
          devices. Your data is stored securely in your personal Google Drive
          and is accessible only by you. By signing in, you grant us permission
          to upload and retrieve data related to the app.
        </p>
        <button
          onClick={handleSignIn}
          disabled={isLoading}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition disabled:opacity-50"
        >
          {isLoading ? "Signing in..." : "Sign in with Google"}
        </button>
        {error && (
          <p className="text-red-500 text-sm mt-4 text-center">{error}</p>
        )}
      </div>
    </div>
  );
};

export default GoogleSignInPage;
