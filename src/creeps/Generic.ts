import { CreepUtils } from "utils/CreepUtils";

export class Generic {
  public static run(creep: Creep) {
    if (creep.ticksToLive && creep.ticksToLive > 200) {
      if (!Memory.generic[creep.room.name].creeps.includes(creep.id)) {
        Memory.generic[creep.room.name].creeps.push(creep.id);
        Memory.generic[creep.room.name].creeps.splice(Memory.generic[creep.room.name].creeps.indexOf("spawning"), 1);
      }
    }

    CreepUtils.setWorking(creep);
    if (creep.memory.working) {
      if (!CreepUtils.fillSpawn(creep)) {
        CreepUtils.upgrade(creep);
      }
    } else {
      CreepUtils.pickup(creep);
    }
  }

  public static getBodySetup(spawnRoom: string) {
    var room = Game.rooms[spawnRoom];
    var maxEnergy = 300;
    if (room) {
      maxEnergy = room.energyCapacityAvailable;
    }
    // Max works is total in source per refresh at 2 ticks per work
    let ratio: Array<BodyPartConstant> = [MOVE, CARRY, WORK, WORK];
    var ratioCost = CreepUtils.getBodyCost(ratio);
    let body: Array<BodyPartConstant> = [];
    let loops = Math.floor(maxEnergy / ratioCost);
    for (var i = 0; i < loops; i++) {
      body = body.concat(ratio);
    }
    return body;
  }

  public static spawn() {
    for (let room in Memory.generic) {
      if (Memory.generic[room].creeps.length < Memory.generic[room].count) {
        Memory.spawnList.push({
          type: "Generic",
          room: room,
          roleMem: {}
        });
        Memory.generic[room].creeps.push("spawning");
      }
    }
  }
}
