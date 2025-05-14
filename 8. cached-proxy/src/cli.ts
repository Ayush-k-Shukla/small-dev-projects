#!/usr/bin/env node

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { clearCache, startServer } from '.';

yargs(hideBin(process.argv))
  .command(
    'hii',
    'Info',
    () => {},
    () => {
      console.log('Hii I am a proxy with cache');
    }
  )
  .command(
    'start',
    'Start the server',
    (yargs) =>
      yargs.options({
        port: {
          type: 'number',
          demandOption: true,
          describe: 'Port to run the server on'
        },
        origin: {
          type: 'string',
          demandOption: true,
          describe: 'Origin to allow'
        }
      }),
    (argv) => {
      startServer(argv.port, argv.origin);
    }
  )
  .command(
    'clear-cache',
    'Clear the cache',
    (yargs) =>
      yargs.option('key', {
        type: 'string',
        describe: 'Optional key to clear specific cache'
      }),
    () => {
      clearCache();
    }
  )
  .help()
  .version().argv;
