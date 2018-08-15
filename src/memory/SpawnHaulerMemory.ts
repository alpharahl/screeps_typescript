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
      if (room.memory.spawnHaulers) {
        // This room needs a spawn hauler, manage it
        for (let creepName of room.memory.spawnHaulers) {
          if (creepName != "spawning") {
            let creep = Game.creeps[creepName];
            if (!creep) {
              var index = room.memory.spawnHaulers.indexOf(creepName);
              room.memory.spawnHaulers.splice(index, 1);
            }
          }
        }
        if (room.memory.spawnHaulers.length < 2) {
          room.memory.spawnHaulers.push("spawning");
        }
      }
    }
  }
}
