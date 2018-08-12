import { Spawner } from "creeps/Spawner";

export class SpawnList {
  public static init() {
    if (!Memory.spawnList) {
      Memory.spawnList = [];
    }
  }

  public static run() {
    for (var spawnData of Memory.spawnList) {
      var room = Game.rooms[spawnData.room];
      var spawn = Game.spawns[Object.keys(Game.spawns)[0]];
      if (room) {
        var spawns = room.find(FIND_MY_SPAWNS);
        if (spawns.length > 0) {
          spawn = spawns[0];
        }
      }
      if (spawn.spawning) {
        continue;
      } else {
        if (Spawner.spawnCreep(spawn, spawnData)) {
          Memory.spawnList.splice(Memory.spawnList.indexOf(spawnData), 1);
        }
      }
    }
  }
}
