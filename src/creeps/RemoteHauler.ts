import { PositionUtils } from "utils/PositionUtils";
import { CreepUtils } from "utils/CreepUtils";
import { RoomUtils } from "utils/RoomUtils";

export class RemoteHauler {
  public static run(creep: Creep) {
    if (!creep.ticksToLive) {
      Game.rooms[creep.memory.room].memory.remoteHaulers[creep.memory.roleMem.source] = creep.name;
      return;
    }
    CreepUtils.setWorking(creep);
    if (creep.memory.working) {
      var roads = creep.pos.findInRange(FIND_STRUCTURES, 1, {
        filter: (road: StructureRoad) => {
          (road.structureType == STRUCTURE_ROAD || road.structureType == STRUCTURE_CONTAINER) &&
            road.hits < road.hitsMax;
        }
      });
      if (roads.length > 0) {
        creep.repair(roads[0]);
      }
      if (creep.room.name == creep.memory.roleMem.spawnRoom) {
        CreepUtils.deposit(creep);
      } else {
        creep.moveTo(new RoomPosition(25, 25, creep.memory.roleMem.spawnRoom));
      }
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

  public static spawn(room: Room) {
    if (!room.memory.sources || (room.controller && room.controller.owner)) {
      // DONT own this room yet
      return false;
    }
    for (var sourceId of room.memory.sources) {
      if (!room.memory.remoteHaulers[sourceId]) {
        return RemoteHauler.createCreep(room, sourceId);
      }
    }
    return false;
  }

  public static createCreep(room: Room, sourceId: string) {
    let ratio = [MOVE, CARRY];
    let spawn = RoomUtils.findBestSpawn(room);
    let roomEnergy = spawn.room.energyAvailable;
    let ratioCost = CreepUtils.getBodyCost(ratio);
    let body = <Array<BodyPartConstant>>[];
    for (let i = 0; i < Math.min(Math.floor((roomEnergy - 150) / ratioCost), 15); i++) {
      body = body.concat(ratio);
    }
    // 1 work to be used to repair roads
    body = body.concat([WORK, MOVE]);
    console.log("Trying to spawn remote hauler", body, roomEnergy, CreepUtils.getBodyCost(body));

    var memory = {
      type: "RemoteHauler",
      room: room.name,
      roleMem: {
        source: sourceId,
        spawnRoom: spawn.room.name
      },
      working: false
    };
    var name = "RHauler-" + spawn.name + "-" + sourceId + "-" + Game.time;
    var result = spawn.spawnCreep(body, name, { memory: memory });
    if (result == OK) {
      room.memory.remoteHaulers[sourceId] = "spawning";
      return true;
    } else {
      console.log("Failed to spawn remote hauler with error", result);
    }
    return false;
  }
}
