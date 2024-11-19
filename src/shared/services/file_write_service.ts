import * as fs from "fs";
import * as path from "path";
import {
  FileOperations,
  FileStats,
  FolderStats,
} from "../interfaces/file_operation_interface";

// FileManagerService Implementation

abstract class FileManagerService implements FileOperations {
  createFile(
    fileName: string,
    folder: string,
    extension: ".ts" | ".js"
  ): boolean {
    try {
      const filePath = path.join(folder, `${fileName}${extension}`);
      if (fs.existsSync(filePath)) {
        console.log("File already exists");
        return false;
      }
      fs.writeFileSync(filePath, ""); // Create an empty file
      console.log(`File ${fileName}${extension} created successfully`);
      return true;
    } catch (error) {
      console.error("Error creating file:", error);
      return false;
    }
  }

  writeFile(filePath: string, data: string): boolean {
    try {
      if (!fs.existsSync(filePath)) {
        console.log("File does not exist");
        return false;
      }
      fs.writeFileSync(filePath, data); // Write data to the file
      console.log(`Data written to ${filePath}`);
      return true;
    } catch (error) {
      console.error("Error writing to file:", error);
      return false;
    }
  }

  createFolder(name: string): boolean {
    try {
      if (fs.existsSync(name)) {
        console.log("Folder already exists");
        return false;
      }
      fs.mkdirSync(name); // Create folder
      console.log(`Folder ${name} created successfully`);
      return true;
    } catch (error) {
      console.error("Error creating folder:", error);
      return false;
    }
  }

  deleteFile(filePath: string): boolean {
    try {
      if (!fs.existsSync(filePath)) {
        console.log("File does not exist");
        return false;
      }
      fs.unlinkSync(filePath); // Delete the file
      console.log(`File at ${filePath} deleted successfully`);
      return true;
    } catch (error) {
      console.error("Error deleting file:", error);
      return false;
    }
  }

  readFile(filePath: string): string | null {
    try {
      if (!fs.existsSync(filePath)) {
        console.log("File does not exist");
        return null;
      }
      const data = fs.readFileSync(filePath, "utf-8"); // Read file content
      console.log(`Read file content from ${filePath}`);
      return data;
    } catch (error) {
      console.error("Error reading file:", error);
      return null;
    }
  }

  renameFile(oldPath: string, newPath: string): boolean {
    try {
      if (!fs.existsSync(oldPath)) {
        console.log("File does not exist");
        return false;
      }
      fs.renameSync(oldPath, newPath); // Rename the file
      console.log(`File renamed from ${oldPath} to ${newPath}`);
      return true;
    } catch (error) {
      console.error("Error renaming file:", error);
      return false;
    }
  }

  fileExists(filePath: string): boolean {
    return fs.existsSync(filePath);
  }

  folderExists(folderPath: string): boolean {
    return fs.existsSync(folderPath) && fs.lstatSync(folderPath).isDirectory();
  }

  listFiles(folderPath: string): string[] {
    try {
      if (!fs.existsSync(folderPath)) {
        console.log("Folder does not exist");
        return [];
      }
      return fs.readdirSync(folderPath); // List files in the folder
    } catch (error) {
      console.error("Error listing files:", error);
      return [];
    }
  }

  getFileStats(filePath: string): FileStats {
    try {
      if (!fs.existsSync(filePath)) {
        console.log("File does not exist");
        return { size: 0, creationDate: new Date(), modifiedDate: new Date() };
      }
      const stats = fs.statSync(filePath);
      return {
        size: stats.size,
        creationDate: stats.birthtime,
        modifiedDate: stats.mtime,
      };
    } catch (error) {
      console.error("Error getting file stats:", error);
      return { size: 0, creationDate: new Date(), modifiedDate: new Date() };
    }
  }

  copyFile(sourcePath: string, destinationPath: string): boolean {
    try {
      if (!fs.existsSync(sourcePath)) {
        console.log("Source file does not exist");
        return false;
      }
      fs.copyFileSync(sourcePath, destinationPath); // Copy file
      console.log(`File copied from ${sourcePath} to ${destinationPath}`);
      return true;
    } catch (error) {
      console.error("Error copying file:", error);
      return false;
    }
  }

  moveFile(sourcePath: string, destinationPath: string): boolean {
    try {
      if (!fs.existsSync(sourcePath)) {
        console.log("Source file does not exist");
        return false;
      }
      fs.renameSync(sourcePath, destinationPath); // Move file (renaming is essentially moving)
      console.log(`File moved from ${sourcePath} to ${destinationPath}`);
      return true;
    } catch (error) {
      console.error("Error moving file:", error);
      return false;
    }
  }

  deleteFolder(folderPath: string): boolean {
    try {
      if (!fs.existsSync(folderPath)) {
        console.log("Folder does not exist");
        return false;
      }
      fs.rmdirSync(folderPath, { recursive: true }); // Delete folder recursively
      console.log(`Folder ${folderPath} deleted successfully`);
      return true;
    } catch (error) {
      console.error("Error deleting folder:", error);
      return false;
    }
  }

  emptyFolder(folderPath: string): boolean {
    try {
      if (!fs.existsSync(folderPath)) {
        console.log("Folder does not exist");
        return false;
      }
      const files = fs.readdirSync(folderPath);
      for (const file of files) {
        const filePath = path.join(folderPath, file);
        if (fs.lstatSync(filePath).isDirectory()) {
          this.deleteFolder(filePath); // Recursive deletion of subfolders
        } else {
          this.deleteFile(filePath); // Delete files
        }
      }
      console.log(`Folder ${folderPath} emptied successfully`);
      return true;
    } catch (error) {
      console.error("Error emptying folder:", error);
      return false;
    }
  }

  getFolderStats(folderPath: string): FolderStats {
    try {
      if (!fs.existsSync(folderPath)) {
        console.log("Folder does not exist");
        return {
          size: 0,
          creationDate: new Date(),
          modifiedDate: new Date(),
          fileCount: 0,
        };
      }
      const stats = fs.statSync(folderPath);
      const fileCount = fs.readdirSync(folderPath).length;
      return {
        size: stats.size,
        creationDate: stats.birthtime,
        modifiedDate: stats.mtime,
        fileCount,
      };
    } catch (error) {
      console.error("Error getting folder stats:", error);
      return {
        size: 0,
        creationDate: new Date(),
        modifiedDate: new Date(),
        fileCount: 0,
      };
    }
  }

  watchFile(filePath: string, callback: (event: string) => void): void {
    fs.watch(filePath, (eventType) => {
      callback(eventType); // Trigger callback when a change occurs
    });
  }
}

export { FileManagerService };
