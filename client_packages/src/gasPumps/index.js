const gasPumpPositions = require('./src/gasStations/gasPumpPositions');
const localplayer = mp.players.local;
const gasPumps = [];

let debugOn = true;

function debugLog(msg) {
  if (debugOn) {
    mp.gui.chat.push(`[DEBUG] ${msg}`);
  }
}

function createGasPumps() {
    gasPumpPositions.forEach(pos => {
        const shape = mp.colshapes.newTube(pos.x, pos.y, pos.z, 2, 2, 0);
        const marker = mp.markers.new(1, pos, 2, {
            visible: true,
            color: [150, 10, 10, 150],
            dimension: 0,
            range: 2,
        });
        const blip = mp.blips.new(1, pos, {
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

    gasPumps.length = 0;
}

mp.events.add({
  "create_gaspumps": () => {
    debugLog("create gaspumps event");
    createGasPumps();
  },
  "delete_gaspumps": () => {
    debugLog("delete gaspumps event");
    deleteAllGasPumps();
  },
  "playerEnterColshape": (shape) => {
    if (gasPumps.some(x => x.shape === shape)) {
      if (localplayer.vehicle) {
        debugLog("you enter gaspump colshape");
        mp.gui.chat.push("You can refuel transport");
        mp.events.callRemote("gaspump::enter_shape");
      }
    }
  }
})