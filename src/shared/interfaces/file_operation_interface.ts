export interface FileOperations {
  createFile(
    fileName: string,
    folder: string,
    extension: ".ts" | ".js"
  ): boolean;
  writeFile(filePath: string, data: string): boolean;
  createFolder(name: string): boolean;
  deleteFile(path: string): boolean;
  readFile(filePath: string): string | null;
  renameFile(oldPath: string, newPath: string): boolean;
  fileExists(filePath: string): boolean;
  folderExists(folderPath: string): boolean;
  listFiles(folderPath: string): string[];
  getFileStats(filePath: string): FileStats;
  copyFile(sourcePath: string, destinationPath: string): boolean;
  moveFile(sourcePath: string, destinationPath: string): boolean;
  deleteFolder(folderPath: string): boolean;
  emptyFolder(folderPath: string): boolean;
  getFolderStats(folderPath: string): FolderStats;
  watchFile(filePath: string, callback: (event: string) => void): void;
}
export interface FileStats {
  size: number;
  creationDate: Date;
  modifiedDate: Date;
}
export interface FolderStats {
  size: number;
  creationDate: Date;
  modifiedDate: Date;
  fileCount: number;
}
