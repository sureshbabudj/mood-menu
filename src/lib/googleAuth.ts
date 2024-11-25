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
