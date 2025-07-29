# Scaling Demonstrations

This TypeScript project demonstrates scaling concepts through interactive simulations.

## Features
- **Vertical scaling** demonstration using Node.js cluster module
- Utilizes all CPU cores on a single machine
- Automatic worker process management
- Built-in fault tolerance (auto-restarts crashed workers)
- Performance benchmarking capabilities

## Project Structure
```
project-root/
├── src/
│   ├── verticalScaling.ts - Core vertical scaling implementation
│   ├── tests/            - Performance tests and benchmarks
│   └── utils/            - Helper functions
├── docs/                 - Architecture diagrams
├── dist/                 - Compiled output
├── package.json          - Project configuration
└── README.md             - Documentation

```

## Key Concepts
- **Horizontal Scaling**: Adding more processes (workers) to handle load
  - Implemented via Node.js cluster module
  - Each worker process utilizes a CPU core
  - Demonstrated in HorizontalScaling.ts
- **Vertical Scaling**: Maximizing resource usage on a single machine
  - Master process forks workers (one per CPU core)
  - Workers share the load on one machine
  - No additional servers required
  - Demonstrated in VerticalScaling.ts

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

## Testing Horizontal Scaling

**Note**: Browser/Postman testing won't show parallel processing clearly because:
- Browsers throttle concurrent requests
- Manual testing can't trigger simultaneous requests
- The `&` operator in terminal enables true parallelism

## Testing Parallel Processing

Run 8 parallel requests (one per CPU core):
```bash
curl http://localhost:3000/api/1000000000 &
curl http://localhost:3000/api/2000000000 &
curl http://localhost:3000/api/3000000000 &
curl http://localhost:3000/api/4000000000 &
curl http://localhost:3000/api/5000000000 &
curl http://localhost:3000/api/100000000 &
curl http://localhost:3000/api/200000000 &
curl http://localhost:3000/api/300000000 &
```

**Note**: Use terminal (`&`) for true parallelism - browsers/Postman throttle requests
