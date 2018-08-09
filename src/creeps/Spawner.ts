import { Harvester } from "./harvester";
import { SpawnHauler } from "./SpawnHauler";
import { Builder } from "./Builder";
import { Upgrader } from "./Upgrader";

export class Spawner {
  public static spawnCreep(spawn: StructureSpawn, spawnObj: CreepSpawnObj) {
    let result;
    switch (spawnObj.type) {
      case "Harvester":
        var body = Harvester.getBodySetup(spawnObj.room, spawnObj.roleMem.source);
        var memory: CreepMemory = {
          type: spawnObj.type,
          room: spawnObj.room,
          roleMem: spawnObj.roleMem,
          working: false
        };
        result = spawn.spawnCreep(body, spawnObj.type + "-" + Game.time, {
          memory: memory
        });
        if (result == OK) {
          Memory.harvesters[spawnObj.roleMem.source] = "Harvester-" + Game.time;
          return true;
        }
        return false;
      case "SpawnHauler":
        var memory = <CreepMemory>Spawner.creepMemory(spawnObj);
        var name = spawnObj.type + "-" + Game.time;
        result = spawn.spawnCreep(spawnObj.body, name, { memory });
        if (result == OK) {
          let room = Game.rooms[spawnObj.room];
          // Remove "Spawning" from memory
          let index = room.memory.spawnHaulers.indexOf("spawning");
          room.memory.spawnHaulers.splice(index, 1);
          room.memory.spawnHaulers.push(name);
          return true;
        }
        return false;
      case "Upgrader":
        var memory = <CreepMemory>Spawner.creepMemory(spawnObj);
        var name = spawnObj.type + "-" + Game.time;
        result = spawn.spawnCreep(spawnObj.body, name, { memory });
        if (result == OK) {
          let room = Game.rooms[spawnObj.room];
          // Remove "Spawning" from memory
          let index = room.memory.upgraders.indexOf("spawning");
          room.memory.upgraders.splice(index, 1);
          room.memory.upgraders.push(name);
          return true;
        }
        return false;
      case "Builder":
        var memory = <CreepMemory>Spawner.creepMemory(spawnObj);
        var name = spawnObj.type + "-" + Game.time;
        result = spawn.spawnCreep(spawnObj.body, name, { memory });
        if (result == OK) {
          let room = Game.rooms[spawnObj.room];
          // Remove 'spawning' from memory
          let index = room.memory.builders.indexOf("spawning");
          room.memory.builders.splice(index, 1);
          room.memory.builders.push(name);
          return true;
        }
        return false;
    }
    return false;
  }

  public static creepMemory(spawnObj: CreepSpawnObj) {
    return <CreepMemory>{
      type: spawnObj.type,
      room: spawnObj.room,
      roleMem: spawnObj.room,
      working: false
    };
  }
}
