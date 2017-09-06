// Service which provides diagnostic functionality. 
// Memory snapshot
// Process information


module.exports = (function () {
    var MemorySnapshot = require('../models/MemorySnapshot').MemorySnapshot;

    function hookMemProfiler() {
        
    }

    function getMemorySnapshot() {
        let metrics = process.memoryUsage();
        let snapshot = new MemorySnapshot();
        for (let key in metrics) {
            console.log(`${key} ${Math.round(metrics[key] / 1024 / 1024 * 100) / 100} MB`);
        }
        return snapshot;
    }

    return {
        getMemorySnapshot: getMemorySnapshot
    };
})();