mp.events.add("playerEnterVehicle", (player, vehicle, seat) => {
  player.notify("Gas stations are shown on the map.");
  player.call("create_gaspumps");
});

mp.events.add("playerExitVehicle", (player, vehicle) => {
  player.notify("You got out of the car and the gas stations were hidden from the map");
  player.call("delete_gaspumps");
});

mp.events.add("gaspump::enter_shape", (player) => {
  if (player.vehicle) {
    player.vehicle.engine = false;
    mp.gui.chat.push("The refueling process has begun");

    setTimeout(() => {
      player.vehicle.engine = true;
      mp.gui.chat.push("Your vehicle is fueled");
    }, 5000)
  }
})