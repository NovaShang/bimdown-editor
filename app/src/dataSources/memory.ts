import type { DataSource } from 'bimdown-editor';
import { createFileSystemDataSource } from './fileSystem.ts';

export interface MemoryDataSource {
  dataSource: DataSource;
  getFiles(): Map<string, string | ArrayBuffer>;
  transitionToFs(handle: FileSystemDirectoryHandle): Promise<DataSource>;
}

export function createMemoryDataSource(
  initialFiles?: Map<string, string | ArrayBuffer>,
): MemoryDataSource {
  const files = new Map<string, string | ArrayBuffer>(initialFiles ?? []);
  const listeners = new Set<(path: string) => void>();

  const dataSource: DataSource = {
    async fetchText(path) {
      const content = files.get(path);
      if (content == null) return null;
      if (typeof content === 'string') return content;
      // Binary → decode as UTF-8 (shouldn't normally be needed for text files)
      return new TextDecoder().decode(content);
    },

    async saveFile(path, content) {
      files.set(path, content);
      for (const cb of listeners) cb(path);
    },

    watchChanges(cb) {
      listeners.add(cb);
      return () => { listeners.delete(cb); };
    },

    async resolveUrl(path) {
      const content = files.get(path);
      if (content == null) return '';
      const blob = content instanceof ArrayBuffer
        ? new Blob([content])
        : new Blob([content], { type: 'text/plain' });
      return URL.createObjectURL(blob);
    },
  };

  return {
    dataSource,
    getFiles: () => new Map(files),
    async transitionToFs(handle) {
      const fsDs = createFileSystemDataSource(handle);
      for (const [path, content] of files) {
        if (typeof content === 'string') {
          await fsDs.saveFile(path, content);
        }
        // Binary files (GLB etc.) are not saved to FS — they're read-only mesh assets
      }
      return fsDs;
    },
  };
}
