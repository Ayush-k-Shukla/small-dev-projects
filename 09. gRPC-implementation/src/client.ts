import * as grpc from '@grpc/grpc-js';
import {
  CreateUserRequest,
  GetUserRequest,
  ListUsersRequest,
  User,
  UserServiceClient
} from '../proto/user';

const client = new UserServiceClient(
  'localhost:50051',
  grpc.credentials.createInsecure()
);

// Create some users
function createUser(name: string, email: string) {
  return new Promise<void>((resolve, reject) => {
    const req: CreateUserRequest = { name, email };
    client.createUser(req, (err, user) => {
      if (err) reject(err);
      else {
        console.log('Created User:', user);
        resolve();
      }
    });
  });
}

// Fetch one user by ID
function getUser(id: string) {
  const req: GetUserRequest = { id };
  client.getUser(req, (err, user) => {
    if (err) console.error('Error:', err.message);
    else console.log('User fetched:', user);
  });
}

// Stream all users
function listUsers() {
  const call = client.listUsers({} as ListUsersRequest);
  call.on('data', (user: User) => console.log('Streamed User:', user));
  call.on('end', () => console.log('Stream ended'));
}

async function main() {
  await createUser('Ayush', 'ayush@example.com');
  await createUser('John', 'john@example.com');

  getUser('1');
  listUsers();
}

main();
