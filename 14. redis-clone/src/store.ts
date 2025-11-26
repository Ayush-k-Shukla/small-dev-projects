export class Store {
  private data: Map<string, string> = new Map();

  set(key: string, value: string): void {
    this.data.set(key, value);
  }

  get(key: string): string | null {
    return this.data.get(key) || null;
  }

  del(key: string): number {
    return this.data.delete(key) ? 1 : 0;
  }
}
