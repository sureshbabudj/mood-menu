import { Plugins } from "@capacitor/core";
const { Filesystem } = Plugins;

// TODO:
const FilesystemDirectory = { Documents: {} };

export const useICloudDrive = () => {
  const saveToICloud = async (fileName: string, content: string) => {
    try {
      await Filesystem.writeFile({
        path: fileName,
        data: content,
        directory: FilesystemDirectory.Documents,
      });
      console.log("File saved to iCloud!");
    } catch (error) {
      console.error("Error saving to iCloud:", error);
    }
  };

  const fetchFromICloud = async (fileName: string) => {
    try {
      const result = await Filesystem.readFile({
        path: fileName,
        directory: FilesystemDirectory.Documents,
      });
      console.log("File fetched from iCloud:", result.data);
      return result.data;
    } catch (error) {
      console.error("Error fetching from iCloud:", error);
      return null;
    }
  };

  return { saveToICloud, fetchFromICloud };
};
