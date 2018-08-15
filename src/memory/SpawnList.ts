import { Spawner } from "creeps/Spawner";
import { CreepUtils } from "utils/CreepUtils";

export class SpawnList {
  public static init() {
    if (!Memory.spawnList) {
      Memory.spawnList = [];
    }
  }

  public static run() {
    // for (var spawnData of Memory.spawnList) {
    //   if (spawnData.body.length == 0) {
    //     Memory.spawnList.splice(Memory.spawnList.indexOf(spawnData), 1);
    //     continue;
    //   }
    //   var room = Game.rooms[spawnData.room];
    //   var spawn = Game.spawns[Object.keys(Game.spawns)[0]];
    //   if (room) {
    //     var spawns = room.find(FIND_MY_SPAWNS);
    //     if (spawns.length > 0) {
    //       spawn = spawns[0];
    //     }
    //   }
    //   if (spawn.spawning || spawn.room.energyAvailable < 300) {
    //     continue;
    //   } else {
    //     if (
    //       spawnData.type == "Harvester" ||
    //       spawnData.type == "SpawnHauler" ||
    //       spawn.room.energyAvailable >= CreepUtils.getBodyCost(spawnData.body)
    //     ) {
    //       if (Spawner.spawnCreep(spawn, spawnData)) {
    //         Memory.spawnList.splice(Memory.spawnList.indexOf(spawnData), 1);
    //       }
    //     }
    //   }
    // }
  }
}
