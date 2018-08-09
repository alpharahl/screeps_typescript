import { CreepUtils } from "utils/CreepUtils";

export class Builder {
  public static run(creep: Creep) {
    CreepUtils.setWorking(creep);
    if (creep.memory.working) {
      var target = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES, {
        filter: i => i.structureType != STRUCTURE_ROAD
      });
      if (!target) {
        target = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
      }
      if (target) {
        if (creep.build(target) == ERR_NOT_IN_RANGE) {
          creep.moveTo(target);
        }
      }
    } else {
      CreepUtils.pickup(creep);
    }
  }

  public static build(creep: Creep, struct: StructureConstant) {
    var target = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES, {
      filter: i => i.structureType == struct
    });
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
    let maxEnergy = room.energyCapacityAvailable;
    let ratio = <Array<BodyPartConstant>>[MOVE, CARRY, WORK];
    let body = <Array<BodyPartConstant>>[];
    for (var i = 0; i < Math.floor(maxEnergy / CreepUtils.getBodyCost(ratio)); i++) {
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
