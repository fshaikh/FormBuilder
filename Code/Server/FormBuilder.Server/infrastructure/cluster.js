// Runs the server using Node cluster API

const cluster = require('cluster');
const os = require('os');

if (cluster.isMaster) {
    // get the cpu cores count
    let cpuCount = os.cpus().length;
    console.log(`Forking for ${cpuCount} CPUs`);
    for (let i = 0; i < cpuCount; i++) {
        cluster.fork();
    }

    // Register for listening for any worker crashes
    cluster.on("exit", _handleWorkerCrash);
} else {
    // launch express app in worker process
    require('./server');
}

/**
 * Event handler when a workr process crashes
 * @param worker - Worker object rperesenting the worker process crashed
 * @param code - Exit code
 * @param signal 
 */
function _handleWorkerCrash(worker, code, signal) {
    if (code !== 0 && !worker.exitedAfterDisconnect) {
        console.log(`Worker ${worker.id} crashed. 
                     Starting a new worker...`);
        // Spawn a new worker process
        cluster.fork();
    }
}

// Restart all worker processes for eg: when deploying new code