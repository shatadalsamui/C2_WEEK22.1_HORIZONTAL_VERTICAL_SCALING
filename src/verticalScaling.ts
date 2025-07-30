import express from "express"; 
import cluster from "cluster"; // Import Node.js cluster module for multi-processing
import os from "os"; // Import OS module to access system information

const totalCPUs = os.cpus().length; // Get total number of CPU cores available
const port = 3000; // Define port for web server

if (cluster.isPrimary) { // Check if this is the primary/master process
    console.log(`Number of CPUs is ${totalCPUs}`); // Log available CPUs
    console.log(`Primary ${process.pid} is running`); // Log master process ID

    for (let i = 0; i < totalCPUs; i++) { // Create one worker per CPU core
        cluster.fork(); // Spawn new worker process
    }

    cluster.on("exit", (worker, code, signal) => { // Handle worker crashes
        console.log(`worker ${worker.process.pid} died`); 
        console.log("Lets fork another worker!");
        cluster.fork(); // Replace dead worker with new one
    });
} else { // This block runs in worker processes
    const app = express(); 
    console.log(`Worker ${process.pid} started`); 

    app.get("/", (req, res) => { 
        res.send("Hello World"); 
    });

    app.get("/api/:n", function (req, res) { // CPU-intensive endpoint
        let n = parseInt(req.params.n); // Get number from URL
        let count = 0; 

        if (n > 5000000000) n = 5000000000; // Prevent excessive CPU usage

        for (let i = 0; i <= n; i++) { // Perform CPU-intensive calculation
            count += i;
        }
        res.send(`Final count is ${count} ${process.pid}`); 
    });

    app.listen(port, () => { 
        console.log(`App listening on port ${port}`); 
    });
}