import { CreepUtils } from "utils/CreepUtils";

export class Harvester {
  public static run(creep: Creep) {
    var source = <Source>Game.getObjectById(creep.memory.roleMem.source);
    if (!source) {
      return CreepUtils.moveRoom(creep, creep.memory.room);
    }
    if (creep.ticksToLive && creep.ticksToLive > 200) {
      Memory.harvesters[source.id] = creep.id;
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

  public static spawn() {
    for (let sourceId of Memory.sources) {
      if (Memory.harvesters[sourceId] == null) {
        let sourceObj = <Source>Game.getObjectById(sourceId);
        if (!sourceObj) {
          continue;
        }
        Memory.spawnList.push({
          type: "Harvester",
          room: sourceObj.room.name,
          roleMem: {
            source: sourceId
          }
        });
        Memory.harvesters[sourceId] = "spawning";
      }
    }
  }
}
