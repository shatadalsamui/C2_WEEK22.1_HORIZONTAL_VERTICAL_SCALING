# Scaling Demonstrations

This TypeScript project demonstrates both vertical and horizontal scaling concepts through interactive simulations.

## Features
- Vertical scaling simulation showing resource allocation
- Horizontal scaling simulation using Node.js cluster module
- Visual representation of scaling effects

## Project Structure
```
project-root/
├── src/
│   ├── HorizontalScaling.ts - Cluster-based horizontal scaling demo
│   ├── VerticalScaling.ts   - Vertical scaling simulation
│   └── (other source files)
├── dist/                    - Compiled JavaScript output
├── node_modules/            - Dependencies
├── package.json             - Project configuration
├── tsconfig.json            - TypeScript configuration
└── README.md                - This file

```

## Prerequisites
- Node.js v16+
- npm/yarn
- TypeScript

## Installation
```bash
npm install
tsc -b  # Build the TypeScript project
```

## Usage
```bash
node dist/index.js
```

## Key Behavior
- **Worker Rotation**: Exactly every 10 seconds
  - Creates one worker per CPU core (auto-detected)
  - Gracefully restarts all workers simultaneously
  - Preserves active connections during rotation

## Cluster Module
The project uses Node.js' built-in `cluster` module with:
- Exactly ${os.cpus().length} worker processes (one per CPU core)
- Precise 10-second worker rotation for load balancing
- Zero-downtime process management

## Testing Endpoints

After starting the server (`node dist/index.js`), you can test the horizontal scaling with:

1. Basic endpoint (returns "Hello World"):
   ```
   curl http://localhost:3000/
   ```
   Expected output:
   ```
   Hello World
   ```

2. CPU-intensive endpoint:
   ```
   curl http://localhost:3000/api/5000
   ```
   - Maximum input value: 50000000 (auto-capped)
   - Expected output: `Final count is [result]`
   
When testing, observe:
- Different worker PIDs handling requests (shown in server logs)
- How the load is distributed across workers
- Automatic worker restarts if you kill a worker process
