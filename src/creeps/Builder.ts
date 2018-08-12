import { CreepUtils } from "utils/CreepUtils";

export class Builder {
  public static run(creep: Creep) {
    if (creep.memory.room && creep.memory.room != creep.room.name) {
      CreepUtils.moveRoom(creep);
      return;
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

  public static spawn(roomName: string) {
    console.log("Spawning a builder for room", roomName);
    let room = Game.rooms[roomName];
    if (room.find(FIND_MY_SPAWNS).length == 0) {
      room = Game.spawns[Object.keys(Game.spawns)[0]].room;
    }
    let maxEnergy = room.energyCapacityAvailable;
    let ratio = <Array<BodyPartConstant>>[MOVE, CARRY, WORK];
    let body = <Array<BodyPartConstant>>[];
    var loops = Math.floor(maxEnergy / CreepUtils.getBodyCost(ratio));
    loops = Math.min(loops, 5);
    loops = Math.max(1, loops);
    for (var i = 0; i < loops; i++) {
      body = body.concat(ratio);
    }
    Memory.spawnList.push({
      type: "Builder",
      room: roomName,
      roleMem: {},
      name: "Upgrader" + Game.time,
      body: body
    });
  }
}
