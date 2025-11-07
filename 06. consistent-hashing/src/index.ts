import crypto from 'crypto';

class ConsistentHashing<T> {
  // Mapping of hash and associated Node
  private ring: Map<number, T>;
  // Map all virtual nodes of a node
  private nodes: Map<T, number[]>;
  private sortedHashes: number[];
  private vNodes: number;

  constructor(vNodes: number = 1000) {
    this.nodes = new Map();
    this.ring = new Map();
    this.sortedHashes = [];
    this.vNodes = vNodes;
  }

  hash(value: string): number {
    return parseInt(
      crypto.createHash('md5').update(value).digest('hex').slice(0, 8),
      16
    );
  }

  binaryInsert(hash: number): void {
    let low = 0,
      high = this.sortedHashes.length;
    while (high < low) {
      let mid = Math.floor((high + low) / 2);
      let val = this.sortedHashes[mid];
      if (val < hash) low = mid + 1;
      else high = mid - 1;
    }
    // Insert at correct sorted position
    this.sortedHashes.splice(low, 0, hash);
  }

  addNode(node: T): void {
    if (this.nodes.has(node)) return;

    const nodeHashes: number[] = [];
    for (let i = 0; i < this.vNodes; i++) {
      const key = `${node}-${i}`;
      const hash = this.hash(key);
      this.binaryInsert(hash);
      this.ring.set(hash, node);
      nodeHashes.push(hash);
    }
    this.nodes.set(node, nodeHashes);
  }

  removeNode(node: T): void {
    if (!this.nodes.has(node)) return;

    const nodeHashes: number[] = this.nodes.get(node)!;
    for (const hash of nodeHashes) {
      this.ring.delete(hash);
    }
    this.nodes.delete(node);

    const nodeHashSet = new Set(nodeHashes);
    this.sortedHashes = this.sortedHashes.filter((v) => !nodeHashSet.has(v));
  }

  binarySearch(hash: number): number {
    let low = 0,
      high = this.sortedHashes.length - 1;
    while (low <= high) {
      const mid = Math.floor((low + high) / 2);
      if (this.sortedHashes[mid] === hash) return mid;
      if (this.sortedHashes[mid] < hash) low = mid + 1;
      else high = mid - 1;
    }
    return low; // First node with hash >= given hash
  }

  getNode(key: string): T | null {
    if (!this.sortedHashes.length) return null;

    const hash = this.hash(key);
    const index = this.binarySearch(hash);
    const nodeHash =
      index >= this.sortedHashes.length
        ? this.sortedHashes[0]
        : this.sortedHashes[index];

    return this.ring.get(nodeHash) ?? null;
  }

  getNodes(): T[] {
    return Array.from(this.nodes.keys());
  }
}

export default ConsistentHashing;
