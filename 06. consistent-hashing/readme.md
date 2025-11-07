# Consistent Hashing

Implementation of consistent hashing with virtual node and other functions

## Details

| **Function Name**            | **Description**                                      | **Time Complexity** |
| ---------------------------- | ---------------------------------------------------- | ------------------- |
| `hash(value: string)`        | Generates a hash using MD5 and extracts 8 hex digits | O(1)                |
| `binaryInsert(hash: number)` | Inserts a hash in sorted order using binary search   | O(N)                |
| `addNode(node: T)`           | Adds a node with multiple virtual nodes              | O(V x N)            |
| `removeNode(node: T)`        | Removes a node and its virtual nodes efficiently     | O(V + N)            |
| `binarySearch(hash: number)` | Finds the closest node using binary search           | O(log N)            |
| `getNode(key: string)`       | Retrieves the responsible node for a key             | O(log N)            |
| `getNodes()`                 | Returns a list of all nodes                          | O(N)                |

Where:

- `N ` is the number of nodes in the hash ring.
- `V` is the number of virtual nodes per actual node.

1. Further we can improve to use Red black tree in place of insert to make complexity to `logN` from `N`.

## Commands

### Run test

```sh
npm run test:watch
```
