import SnowFlake from '../src';

describe('Snowflake ID Generator', () => {
  let generator: SnowFlake;

  beforeEach(() => {
    generator = new SnowFlake(1);
  });

  test('Generated IDs should be unique', () => {
    const ids = new Set();
    for (let i = 0; i < 1000; i++) {
      const id = generator.generateId();
      expect(ids.has(id)).toBe(false);
      ids.add(id);
    }
  });

  test('Generated IDs should be in increasing order', () => {
    let prevId = generator.generateId();
    for (let i = 0; i < 1000; i++) {
      const newId = generator.generateId();
      expect(newId > prevId).toBe(true);
      prevId = newId;
    }
  });

  test('Machine ID out of range should throw an error', () => {
    expect(() => new SnowFlake(1024)).toThrowErrorMatchingSnapshot();
    expect(() => new SnowFlake(-1)).toThrowErrorMatchingSnapshot();
  });

  test('Clock moving backwards should throw an error', () => {
    generator['lastTimeStamp'] = generator['currentTimeStamp']() + 1n;
    expect(() => generator.generateId()).toThrowErrorMatchingSnapshot(
      'Clock moved backwards. Refusing to generate ID'
    );
  });

  test('Timestamp should be within 41 bits', () => {
    const id = generator.generateId();
    const timestamp = id >> (10n + 12n);
    expect(timestamp < 1n << 41n).toBe(true);
  });
});
