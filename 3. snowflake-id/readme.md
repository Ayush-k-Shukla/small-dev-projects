# Snowflake ID Generator (TypeScript)

This project implements a **Snowflake ID generator** in **TypeScript**. It ensures **unique, distributed, and time-ordered IDs** based on Twitter’s Snowflake algorithm.

## Features

- Globally unique 64-bit IDs
- Time-based ordering
- Efficient and scalable
- Prevents sequence collisions
- Unit tested using Jest

## Commands

### Run test

```sh
npm run test
```

### Start server

```sh
npm run dev
```

## Usage

```sh
import SnowFlake from '../src';

// Initialize with a machine ID (0-1023)
const generator = new Snowflake(1n);

// Generate a unique ID
const id = generator.generateId();
console.log(id.toString());
```
