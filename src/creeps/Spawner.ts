import { Harvester } from "creeps/Harvester";
import { Generic } from "creeps/Generic";

export class Spawner {
  public static spawnCreep(spawn: StructureSpawn, spawnObj: CreepSpawnObj) {
    switch (spawnObj.type) {
      case "Harvester":
        var body = Harvester.getBodySetup(spawnObj.room, spawnObj.roleMem.source);
        var memory: CreepMemory = {
          type: spawnObj.type,
          room: spawnObj.room,
          roleMem: spawnObj.roleMem,
          working: false
        };
        return spawn.spawnCreep(body, spawnObj.type + Game.time, {
          memory: memory
        });
      case "Generic":
        var body = Generic.getBodySetup(spawnObj.room);
        var memory: CreepMemory = {
          type: spawnObj.type,
          room: spawnObj.room,
          roleMem: spawnObj.roleMem,
          working: false
        };
        return spawn.spawnCreep(body, spawnObj.type + Game.time, { memory: memory });
    }
    return false;
  }
}
