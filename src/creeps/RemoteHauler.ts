import { PositionUtils } from "utils/PositionUtils";
import { CreepUtils } from "utils/CreepUtils";

export class RemoteHauler {
  public static run(creep: Creep) {
    if (!creep.ticksToLive || creep.ticksToLive > 200) {
      Memory.haulers[creep.memory.roleMem.source] = creep.name;
    }
    CreepUtils.setWorking(creep);
    if (creep.memory.working) {
      if (creep.room.name == creep.memory.roleMem.spawnRoom) {
        CreepUtils.deposit(creep);
      } else creep.moveTo(new RoomPosition(25, 25, creep.memory.roleMem.spawnRoom));
    } else {
      if (creep.room.name == creep.memory.room) {
        CreepUtils.pickup(creep);
      } else {
        let source = <Source>Game.getObjectById(creep.memory.roleMem.source);
        if (source) {
          creep.moveTo(source);
        } else {
          creep.moveTo(new RoomPosition(25, 25, creep.memory.room));
        }
      }
    }
  }

  public static spawn(source: Source, room: Room) {
    let ratio = [MOVE, CARRY];
    let spawn = PositionUtils.getClosestSpawn(source.pos);
    let roomEnergy = spawn.room.energyCapacityAvailable;
    let ratioCost = CreepUtils.getBodyCost(ratio);
    let body = <Array<BodyPartConstant>>[];
    for (let i = 0; i < Math.floor(roomEnergy / ratioCost); i++) {
      body = body.concat(ratio);
    }

    Memory.spawnList.push({
      type: "RemoteHauler",
      room: source.room.name,
      roleMem: {
        spawnRoom: spawn.room.name,
        source: source.id
      },
      body: body
    });
    Memory.haulers[source.id] = "spawning";
  }
}
