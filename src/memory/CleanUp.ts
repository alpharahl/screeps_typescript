export class CleanUp {
  public static run() {
    if (Game.time % 25 == 2) {
      for (var name in Game.rooms) {
        var room = Game.rooms[name];
        if (!room.memory) {
          console.log("skipping memory cleanup in ", room.name);
          continue;
        }

        if (room.memory.harvesters) {
          console.log("Cleaning harvesters in", room.name);
          for (var id in room.memory.harvesters) {
            if (room.memory.harvesters[id] == "spawning") {
              room.memory.harvesters[id] = null;
            }
          }
        }

        if (room.memory.spawnHaulers) {
          console.log("Cleaning spawnHaulers in", room.name);
          while (room.memory.spawnHaulers.indexOf("spawning") != -1) {
            var ind = room.memory.spawnHaulers.indexOf("spawning");
            room.memory.spawnHaulers.splice(ind, 1);
          }
        }

        if (room.memory.remoteHaulers) {
          console.log("Cleaning remoteHaulers in", room.name);
          for (var id in room.memory.remoteHaulers) {
            if (room.memory.remoteHaulers[id] == "spawning") {
              room.memory.remoteHaulers[id] = null;
            }
          }
        }

        if (room.memory.localHaulers) {
          console.log("Cleaning localHaulers in", room.name);
          while (room.memory.localHaulers.indexOf("spawning") != -1) {
            var ind = <number>room.memory.localHaulers.indexOf("spawning");
            room.memory.localHaulers.splice(ind, 1);
          }
        }

        if (room.memory.reserved) {
          console.log("Cleaning reserved in", room.name);
          for (var id in room.memory.reserved) {
            if (room.memory.reserved[id] == "spawning") {
              room.memory.reserved[id] = null;
            }
          }
        }

        if (room.memory.upgraders) {
          console.log("Cleaning upgraders in", room.name);
          while (room.memory.upgraders.indexOf("spawning") != -1) {
            var ind = room.memory.upgraders.indexOf("spawning");
            room.memory.upgraders.splice(ind, 1);
          }
        }

        if (room.memory.builders) {
          console.log("Cleaning builders in", room.name);
          while (room.memory.builders.indexOf("spawning") != -1) {
            var ind = room.memory.builders.indexOf("spawning");
            room.memory.builders.splice(ind, 1);
          }
        }
      }
    }
  }
}
