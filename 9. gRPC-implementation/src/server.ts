import * as grpc from '@grpc/grpc-js';
import {
  CreateUserRequest,
  GetUserRequest,
  ListUsersRequest,
  User,
  UserServiceServer,
  UserServiceService
} from '../proto/user';

// In-memory user store
const users: User[] = [];

class UserServer implements UserServiceServer {
  [name: string]: grpc.UntypedHandleCall;

  // Get a single user by ID
  getUser(
    call: grpc.ServerUnaryCall<GetUserRequest, User>,
    callback: grpc.sendUnaryData<User>
  ): void {
    const user = users.find((u) => u.id === call.request.id);
    if (!user) {
      return callback({
        code: grpc.status.NOT_FOUND,
        message: 'User not found'
      });
    }
    callback(null, user);
  }

  // Create a new user
  createUser(
    call: grpc.ServerUnaryCall<CreateUserRequest, User>,
    callback: grpc.sendUnaryData<User>
  ): void {
    const newUser: User = {
      id: (users.length + 1).toString(),
      name: call.request.name,
      email: call.request.email
    };
    users.push(newUser);
    console.log('User created:', newUser);
    callback(null, newUser);
  }

  // Stream all users
  listUsers(call: grpc.ServerWritableStream<ListUsersRequest, User>): void {
    console.log('Streaming users...');
    users.forEach((u) => call.write(u));
    console.log(`Streamed ${users.length} users...`);
    call.end();
  }
}

function main() {
  const server = new grpc.Server();
  server.addService(UserServiceService, new UserServer());
  const PORT = 50051;

  server.bindAsync(
    `0.0.0.0:${PORT}`,
    grpc.ServerCredentials.createInsecure(),
    (err, boundPort) => {
      if (err) throw err;
      server.start();
      console.log(`gRPC UserService running on port ${boundPort}`);
    }
  );
}

main();
