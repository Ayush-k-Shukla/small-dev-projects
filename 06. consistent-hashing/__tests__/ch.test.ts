import ConsistentHashing from '../src/index';

describe('ConsistentHashing', () => {
  let ch: ConsistentHashing<string>;

  beforeEach(() => {
    ch = new ConsistentHashing<string>(10);
  });

  test('should add a node and retrieve it', () => {
    ch.addNode('Node A');
    expect(ch.getNodes()).toContain('Node A');
  });

  test('should distribute keys to the correct node', () => {
    ch.addNode('Node A');
    ch.addNode('Node B');
    expect('Node B').toBe(ch.getNode(`key-1`));
    expect('Node A').toBe(ch.getNode(`key-2`));
    expect('Node A').toBe(ch.getNode(`key-3`));
  });

  test('should return null if no nodes exist', () => {
    expect(ch.getNode('someKey')).toBeNull();
  });

  test('should remove a node and reassign keys', () => {
    ch.addNode('Node A');
    ch.addNode('Node B');
    const key = 'Node A-0';
    const initialNode = ch.getNode(key);
    ch.removeNode(initialNode!);
    // expect(ch.getNodes()).toBe('Node A');
    const newNode = ch.getNode(key);
    expect(newNode).not.toBe(initialNode);
  });

  test('should handle multiple nodes correctly', () => {
    ch.addNode('Node A');
    ch.addNode('Node B');
    ch.addNode('Node C');
    expect(ch.getNodes()).toHaveLength(3);
  });
});
