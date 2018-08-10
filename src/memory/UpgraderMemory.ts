import { Upgrader } from "creeps/Upgrader";

export class UpgraderMemory {
  public static init() {
    for (let n in Game.rooms) {
      let room = Game.rooms[n];
      if (room.find(FIND_MY_SPAWNS).length > 0) {
        if (room.memory.upgraders == null) {
          console.log("Resetting upgraders for", room.name);
          room.memory.upgraders = [];
        }
      }
    }
  }

  public static run() {
    for (let n in Game.rooms) {
      var room = Game.rooms[n];
      if (room.memory.upgraders) {
        for (let creepName of room.memory.upgraders) {
          if (creepName != "spawning") {
            let creep = Game.creeps[creepName];
            if (!creep) {
              var index = room.memory.upgraders.indexOf(creepName);
              room.memory.upgraders.splice(index, 1);
            }
          }
        }
        if (room.memory.upgraders.length < 2) {
          Upgrader.spawn(room.name);
          room.memory.upgraders.push("spawning");
        }
      }
    }
  }
}
