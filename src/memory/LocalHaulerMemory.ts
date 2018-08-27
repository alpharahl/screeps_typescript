import { LocalHauler } from "creeps/LocalHauler";

export class LocalHaulerMemory {
  public static run() {
    for (let n in Game.rooms) {
      var room = Game.rooms[n];
      if (!room.memory.localHaulers && room.controller && room.controller.owner) {
        room.memory.localHaulers = [];
      }
      if (!room.memory.localHaulers) {
        // don't own this room
        continue;
      }
      for (var name of room.memory.localHaulers) {
        if (name == "spawning") {
          continue;
        } else {
          if (!Game.creeps[name]) {
            let ind = room.memory.localHaulers.indexOf(name);
            room.memory.localHaulers.splice(ind, 1);
          }
        }
      }
    }
  }
}
