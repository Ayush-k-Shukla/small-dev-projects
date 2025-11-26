import { Store } from './store';

export class CommandHandler {
  private store: Store;

  constructor() {
    this.store = new Store();
  }

  handle(command: string[]): any {
    if (!command || command.length === 0) return null;

    const cmd = command[0].toUpperCase();
    const args = command.slice(1);

    switch (cmd) {
      case 'PING':
        return 'PONG';
      case 'ECHO':
        return args[0];
      case 'SET':
        if (args.length < 2) {
          return new Error("ERR: wrong number of arguments for 'set' command");
        }
        this.store.set(args[0], args[1]);
        return 'OK';
      case 'GET':
        if (args.length < 1) {
          return new Error("ERR: wrong number of arguments for 'get' command");
        }
        return this.store.get(args[0]);
      case 'DEL':
        if (args.length < 1) {
          return new Error("ERR: wrong number of arguments for 'del' command");
        }
        return this.store.del(args[0]);
      default:
        return new Error(`ERR: unknown command '${cmd}'`);
    }
  }
}
