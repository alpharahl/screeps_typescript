import { CreepUtils } from "utils/CreepUtils";
import { RoomUtils } from "utils/RoomUtils";

export class Builder {
  public static run(creep: Creep) {
    if (!creep.ticksToLive) {
      var room = creep.room;
      if (room.memory.builders.indexOf(creep.name) == -1) {
        var indSpawning = room.memory.builders.indexOf("spawning");
        room.memory.builders.splice(indSpawning, 1);
        room.memory.builders.push(creep.name);
      }
    }
    CreepUtils.setWorking(creep);
    if (creep.memory.working) {
      var target = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES, {
        filter: i => i.structureType != STRUCTURE_ROAD
      });
      if (!target) {
        if (!Builder.dismantle(creep)) {
          target = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
        }
      }
      if (target) {
        if (creep.build(target) == ERR_NOT_IN_RANGE) {
          creep.moveTo(target);
        }
      }
    } else {
      if (creep.memory.room && creep.memory.room != creep.room.name) {
        creep.say(creep.memory.room);
        console.log("Moving back to ", creep.memory.room);
        CreepUtils.moveRoom(creep);
        return;
      }
      CreepUtils.withdraw(creep);
    }
  }

  public static dismantle(creep: Creep) {
    var target = <any>creep.pos.findClosestByPath(CreepUtils.findHostileSpawns(creep.room));
    if (!target) {
      target = creep.pos.findClosestByPath(CreepUtils.findHostileStructures(creep.room));
    }
    if (target) {
      if (creep.dismantle(target) == ERR_NOT_IN_RANGE) {
        creep.moveTo(target);
      }
      return true;
    }
    return false;
  }

  public static build(creep: Creep, struct: StructureConstant) {
    var target = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES, {
      filter: i => i.structureType == struct
    });
    var room = creep.room;
    if (room.memory.builders.indexOf(creep.name) == -1) {
      let ind = room.memory.builders.indexOf("spawning");
      room.memory.builders.splice(ind, 1);
      room.memory.builders.push(creep.name);
    }
    if (creep.ticksToLive == 1) {
      let ind = room.memory.builders.indexOf(creep.name);
      room.memory.builders.splice(ind, 1);
    }
    if (target) {
      if (creep.build(target) == ERR_NOT_IN_RANGE) {
        creep.moveTo(target);
      }
      return true;
    } else {
      return false;
    }
  }

  public static spawn(room: Room) {
    if (room.memory.builders.length < room.memory.builderCount) {
      return Builder.createCreep(room);
    }
    return false;
  }

  public static getBody(spawnRoom: Room) {
    var energyAvailable = spawnRoom.energyAvailable;
    var ratio = [MOVE, WORK, CARRY];
    var ratioCost = CreepUtils.getBodyCost(ratio);
    var loops = Math.floor(energyAvailable / ratioCost);
    var body = <Array<BodyPartConstant>>[];
    for (var i = 0; i < loops; i++) {
      body = body.concat(ratio);
    }
    return body;
  }

  public static createCreep(room: Room) {
    console.log("Attempting to spawn an builder for", room);
    var spawn = RoomUtils.findBestSpawn(room);
    if (spawn.spawning || spawn.room.energyAvailable < 300) {
      return false;
    }
    var body = Builder.getBody(spawn.room);
    var creepMemory = {
      type: "Builder",
      room: room.name,
      roleMem: {},
      working: false
    };
    var name = "Builder" + "-" + spawn.name + "-" + Game.time;
    var result = spawn.spawnCreep(body, name, {
      memory: creepMemory
    });

    if (result == OK) {
      room.memory.builders.push("spawning");
      return true;
    } else {
      console.log("Failed to spawn Builder with error", result);
    }

    return false;
  }
}
