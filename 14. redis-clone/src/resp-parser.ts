export class RespParser {
  parse(buffer: Buffer): any[] {
    const commands: any[] = [];
    let cursor = 0;

    while (cursor < buffer.length) {
      const type = String.fromCharCode(buffer[cursor]);
      cursor++;

      switch (type) {
        // Array support only
        case '*':
          const { value, newCursor } = this.parseArray(buffer, cursor);
          commands.push(value);
          cursor = newCursor;
          break;
        default:
          break;
      }
    }
    return commands;
  }

  private parseArray(
    buffer: Buffer,
    cursor: number
  ): { value: any[]; newCursor: number } {
    const endLine = buffer.indexOf('\r\n', cursor);
    const count = parseInt(buffer.toString('utf-8', cursor, endLine));
    let currentCursor = endLine + 2;
    const array: any[] = [];

    for (let i = 0; i < count; i++) {
      const type = String.fromCharCode(buffer[currentCursor]);
      currentCursor++;

      // Currently only check added for bulk string
      if (type === '$') {
        const lenEnd = buffer.indexOf('\r\n', currentCursor);
        const len = parseInt(buffer.toString('utf-8', currentCursor, lenEnd));
        currentCursor = lenEnd + 2;
        if (len === -1) {
          array.push(null);
        } else {
          array.push(
            buffer.toString('utf-8', currentCursor, currentCursor + len)
          );
          currentCursor += len + 2;
        }
      }
    }

    return { value: array, newCursor: currentCursor };
  }

  serialize(data: any): string {
    // error
    if (data === null || data === undefined) {
      return '$-1\r\n';
    }
    if (Array.isArray(data)) {
      let res = `*${data.length}\r\n`;
      for (const item of data) {
        res += this.serialize(item);
      }
      return res;
    }
    if (typeof data === 'number') {
      return `:${data}\r\n`;
    }
    if (data instanceof Error) {
      return `-${data.message}\r\n`;
    }
    // Default to Bulk String for safety
    if (typeof data === 'string') {
      if (data === 'OK' || data === 'PONG') {
        return `+${data}\r\n`;
      }
      return `$${data.length}\r\n${data}\r\n`;
    }
    return `+${String(data)}\r\n`;
  }

  serializeError(message: string): string {
    return `-${message}\r\n`;
  }
}
