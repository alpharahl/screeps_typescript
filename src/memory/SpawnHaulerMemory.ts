import { SpawnHauler } from "creeps/SpawnHauler";

export class SpawnHaulerMemory {
  public static init() {
    for (let n in Game.rooms) {
      let room = Game.rooms[n];
      if (room.find(FIND_MY_SPAWNS).length > 0) {
        if (room.memory.spawnHaulers == null) {
          console.log("Reseting spawn Haulers for", room.name);
          room.memory.spawnHaulers = [];
        }
      }
    }
  }

  public static run() {
    for (let n in Game.rooms) {
      var room = Game.rooms[n];
      if (!room.memory.spawnHaulers && room.controller && room.controller.owner) {
        room.memory.spawnHaulers = [];
      }
      if (!room.memory.spawnHaulers) {
        // don't own this room
        continue;
      }
      for (var name of room.memory.spawnHaulers) {
        if (name == "spawning") {
          continue;
        } else {
          if (!Game.creeps[name]) {
            let ind = room.memory.spawnHaulers.indexOf(name);
            room.memory.spawnHaulers.splice(ind, 1);
          }
        }
      }
    }
  }
}
