import { Spawner } from "creeps/Spawner";

export class SpawnList {
  public static init() {
    if (!Memory.spawnList) {
      Memory.spawnList = [];
    }
  }

  public static run() {
    if (Memory.spawnList.length > 0) {
      var room = Game.rooms[Memory.spawnList[0].room];
      var spawn = Game.spawns[0];
      if (room) {
        var spawns = room.find(FIND_MY_SPAWNS);
        spawns.forEach(roomSpawn => {
          spawn = roomSpawn;
        });
      }
      if (spawn.spawning) {
        return;
      } else {
        if (Spawner.spawnCreep(spawn, Memory.spawnList[0])) {
          Memory.spawnList.shift();
        }
      }
    }
  }
}
