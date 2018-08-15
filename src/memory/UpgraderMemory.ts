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
      if (!room.memory.upgraders) {
        room.memory.upgraders = [];
      }
      for (var name of room.memory.upgraders) {
        if (name == "spawning") {
          continue;
        } else {
          if (!Game.creeps[name]) {
            let ind = room.memory.upgraders.indexOf(name);
            room.memory.upgraders.splice(ind, 1);
          }
        }
      }
    }
  }
}
