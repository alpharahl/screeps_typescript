import { CreepUtils } from "utils/CreepUtils";
import { RoomUtils } from "utils/RoomUtils";

export class SpawnHauler {
  public static run(creep: Creep) {
    if (!creep.ticksToLive) {
      var room = creep.room;
      if (room.memory.spawnHaulers.indexOf(creep.name) == -1) {
        var indSpawning = room.memory.spawnHaulers.indexOf("spawning");
        room.memory.spawnHaulers.splice(indSpawning, 1);
        room.memory.spawnHaulers.push(creep.name);
      }
    }

    CreepUtils.setWorking(creep);
    if (creep.memory.working) {
      CreepUtils.fillSpawn(creep);
    } else {
      CreepUtils.pickup(creep);
    }
  }

  public static spawn(room: Room) {
    if (room.memory.spawnHaulers.length < 2) {
      return SpawnHauler.createCreep(room);
    }
    return false;
  }

  public static getBody(spawnRoom: Room) {
    var maxCarry = 400;
    var energyAvailable = spawnRoom.energyAvailable;
    var numCarries = Math.floor(energyAvailable / 100);
    numCarries = Math.min(numCarries, maxCarry / 50);
    var moves = <Array<BodyPartConstant>>[];
    var carries = <Array<BodyPartConstant>>[];
    for (var i = 0; i < numCarries; i++) {
      moves = moves.concat([MOVE]);
      carries = carries.concat([CARRY]);
    }
    var body = moves.concat(carries);
    return body;
  }

  public static createCreep(room: Room) {
    console.log("Attempting to spawn a spawn hauler for", room);
    var spawn = RoomUtils.findBestSpawn(room);
    if (spawn.spawning || spawn.room.energyAvailable < 300) {
      return false;
    }
    var body = SpawnHauler.getBody(spawn.room);
    var creepMemory = {
      type: "SpawnHauler",
      room: room.name,
      roleMem: {},
      working: false
    };
    var name = "SpawnHauler" + "-" + spawn.name + "-" + Game.time;
    var result = spawn.spawnCreep(body, name, {
      memory: creepMemory
    });

    if (result == OK) {
      room.memory.spawnHaulers.push("spawning");
      return true;
    } else {
      console.log("Failed to spawn spawnhauler with error", result);
    }

    return false;
  }
}
