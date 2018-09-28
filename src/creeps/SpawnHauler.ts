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
      if (creep.carry.energy == 0) {
        var storage = <any>creep.pos.findClosestByPath(FIND_STRUCTURES, {
          filter: i => i.structureType == STRUCTURE_CONTAINER || i.structureType == STRUCTURE_STORAGE
        });
        var type: ResourceConstant = <ResourceConstant>Object.keys(creep.carry)[1];
        console.log(storage, type, creep.carry[type], creep.transfer(storage, type, creep.carry[type]));
        if (creep.transfer(storage, type, creep.carry[type]) == ERR_NOT_IN_RANGE) {
          creep.moveTo(storage);
        }
      } else {
        CreepUtils.fillSpawn(creep);
      }
    } else {
      CreepUtils.withdraw(creep);
    }
  }

  public static spawn(room: Room) {
    if (!room.memory.spawnHaulers) {
      // reserved room
      return false;
    }
    if (room.memory.spawnHaulers.length < 2) {
      return SpawnHauler.createCreep(room);
    }
    return false;
  }

  public static getBody(spawnRoom: Room) {
    var maxCarry = 800;
    var energyAvailable = spawnRoom.energyAvailable;
    var numCarries = Math.floor(energyAvailable / 150);
    numCarries = Math.min(numCarries, maxCarry / 50);
    var moves = <Array<BodyPartConstant>>[];
    var carries = <Array<BodyPartConstant>>[];
    for (var i = 0; i < numCarries; i++) {
      moves = moves.concat([MOVE]);
      carries = carries.concat([CARRY]);
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
