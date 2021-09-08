const gasPumpPositions = [
    new Vector3(256.35928, -1253.2850, 28.5),
    new Vector3(256.33840, -1261.2051, 28.5),
    new Vector3(256.35724, -1268.5227, 28.5),

    new Vector3(265.16406, -1268.7261, 28.5),
    new Vector3(265.06400, -1261.4049, 28.5),
    new Vector3(265.04333, -1253.3398, 28.5),

    new Vector3(273.81546, -1253.3646, 28.5),
    new Vector3(273.74442, -1261.3108, 28.5),
    new Vector3(273.80430, -1268.4535, 28.5),
]

let gasPumps = [];

function createGasPumps() {
    gasPumpPositions.forEach(pos => {
        let shape = mp.colshapes.newTube(pos.x, pos.y, pos.z, 2, 2, 0);
        let marker = mp.markers.new(1, pos, 2, {
            visible: true,
            color: [150, 10, 10, 150],
            dimension: 0,
            range: 2,
        });
        let blip = mp.blips.new(1, pos, {
            scale: 1,
            color: 1,
            dimension: 0,
        });

        gasPumps.push({
            shape: shape,
            marker: marker,
            blip: blip
        });
    });
}

function deleteAllGasPumps() {
    gasPumps.forEach(x => {
        if (x.shape) {
            x.shape.destroy();
        }
        if (x.marker) {
            x.marker.destroy();
        }
        if (x.blip) {
            x.blip.destroy();
        }
    })

    gasPumps = [];
}

mp.events.add("playerEnterColshape", (shape) => {
    if (gasPumps.some(x => x.shape === shape)) {
        if (mp.players.local.vehicle) {
            mp.gui.chat.push("You can refuel transport");
            //mp.events.callRemote("gasPump::start");
        }
    }
});