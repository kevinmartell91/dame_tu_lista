export interface StorageWrapper {
  // NOTE: Even though the current storage implementations for StorageWrapper both
  // provide SYNCHRONOUS APIs, I'm forcing the GET request to be an ASYNCHRONOUS API in
  // order to future-proof it against other implementations that use technologies like
  // IndexedDB or remote AJAX requests and cannot be synchronous.
  get<T>(key: string): Promise<T | null>;
  remove(key: string): void;
  set(key: string, value: any): void;
}
