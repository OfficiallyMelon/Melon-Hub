class SaveManager {
  static saveBoolean(key: string, value: boolean, overwrite: boolean = true): void {
    if (overwrite || localStorage.getItem(key) === null) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }

  static importBoolean(key: string): boolean {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : false;
  }

  static saveString(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  static importString(key: string): string | null {
    return localStorage.getItem(key);
  }

  static saveObject(key: string, value: object): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  static importObject(key: string): object | null {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  }
}

export { SaveManager };
