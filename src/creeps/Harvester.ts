import { CreepUtils } from "utils/CreepUtils";

export class Harvester {
  public static run(creep: Creep) {
    var source = <Source>Game.getObjectById(creep.memory.roleMem.source);
    if (!source) {
      return CreepUtils.moveRoom(creep, creep.memory.room);
    }

    if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
      creep.moveTo(source);
    }
  }

  public static getBodySetup(spawnRoom: string, sourceId: string) {
    var room = Game.rooms[spawnRoom];
    var maxEnergy = 300;
    var sourceTotal = 1500;
    if (room) {
      maxEnergy = room.energyCapacityAvailable;
    }
    var source = <Source>Game.getObjectById(sourceId);
    if (source) {
      sourceTotal = source.energyCapacity;
    }
    // Max works is total in source per refresh at 2 ticks per work
    let maxWorks = Math.floor(sourceTotal / 300 / 2);
    let ratio: Array<BodyPartConstant> = [MOVE, WORK, WORK];
    var ratioCost = CreepUtils.getBodyCost(ratio);
    let body: Array<BodyPartConstant> = [];
    let loops = Math.min(maxWorks, Math.floor(maxEnergy / ratioCost));
    for (var i = 0; i < loops; i++) {
      body = body.concat(ratio);
    }
    return body;
  }

  public static spawn(sourceId: string) {
    console.log("Going to add a hauler to the spawn queue", sourceId);
    let body = [MOVE, MOVE, WORK, WORK, WORK, WORK, WORK];
    let source = <Source>Game.getObjectById(sourceId);
    if (source) {
      let roomEnergy = source.room.energyCapacityAvailable;
      let maxWorksSource = Math.floor(source.energyCapacity / 300 / 2);
      let maxWorksRoom = Math.floor((roomEnergy - 100) / 100);
      let loops = Math.min(maxWorksRoom, maxWorksSource);
      body = [MOVE, MOVE];
      for (let i = 0; i < loops; i++) {
        body = body.concat([WORK]);
      }
    }

    Memory.spawnList.push({
      type: "Harvester",
      room: source.room.name,
      roleMem: {
        source: sourceId
      },
      name: "Harvester-" + sourceId,
      body: body
    });
  }
}
