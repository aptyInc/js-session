this.onmessage = function(e) {
    if (e.data.toadd !== undefined) {
        this.postMessage({
            result: e.data.toadd.number1 + e.data.toadd.number2
        });
    }
};
