
module.exports = (function () {
    function MemorySnapshot() {
        this.residentSetSize = 0;
        this.totalHeap = 0;
        this.consumedHeap = 0;
    }

    MemorySnapshot.prototype.toString = function () {
        return `Resident Set Size : ${this.residentSetSize}
                Total Heap Size   : ${this.totalHeap}
                Used Heap Size    : ${this.consumedHeap}
                `;
    }

    return {
        MemorySnapshot: MemorySnapshot
    };
})();
