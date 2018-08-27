import { CreepUtils } from "utils/CreepUtils";
import { PositionUtils } from "utils/PositionUtils";
import { RoomUtils } from "utils/RoomUtils";

export class Harvester {
  public static run(creep: Creep) {
    var source = <Source>Game.getObjectById(creep.memory.roleMem.source);
    if (!source) {
      return CreepUtils.moveRoom(creep, creep.memory.room);
    }
    if (!creep.ticksToLive) {
      var room = Game.rooms[creep.memory.room];
      room.memory.harvesters[creep.memory.roleMem.source] = creep.name;
    }

    if (creep.memory.container && creep.memory.container != "") {
      var container = <StructureContainer>Game.getObjectById(creep.memory.container);
      if (!container) {
        creep.memory.container = "";
        return;
      }
      if (PositionUtils.compareTwo(container.pos, creep.pos)) {
        creep.memory.container = "";
      } else {
        creep.moveTo(container);
        return;
      }
    }

    if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
      let container = <Array<StructureContainer>>source.pos.findInRange(FIND_STRUCTURES, 1, {
        filter: { structureType: STRUCTURE_CONTAINER }
      });
      if (container.length > 0) {
        creep.memory.container = container[0].id;
        creep.moveTo(container[0]);
      } else {
        creep.moveTo(source);
      }
    }
    return;
  }

  public static spawn(room: Room) {
    if (!room.memory.sources) {
      // DONT own this room yet
      return false;
    }
    for (var sourceId of room.memory.sources) {
      if (!room.memory.harvesters[sourceId]) {
        return Harvester.createCreep(room, sourceId);
      }
    }
    return false;
  }

  public static getBody(spawnRoom: Room, sourceId: string) {
    var source = <Source>Game.getObjectById(sourceId)!;
    // Total energy / 300 ticks per regen / 2 energy per work per tick
    var maxWorks = Math.ceil(source.energyCapacity / 300 / 2);
    var energyAvail = spawnRoom.energyAvailable;
    var numWorks = Math.floor((energyAvail - 100) / 100);
    numWorks = Math.min(numWorks, maxWorks);
    var moves = <Array<BodyPartConstant>>[];
    var works = <Array<BodyPartConstant>>[];
    moves = [MOVE, MOVE];
    for (var i = 0; i < numWorks; i++) {
      works = works.concat([WORK]);
    }

    var body = moves.concat(works);
    console.log("tyring to spawn", body, "with", energyAvail);
    return body;
  }

  public static createCreep(room: Room, sourceId: string) {
    console.log("Attempting to spawn a harvester for room", room);
    var spawn = RoomUtils.findBestSpawn(room);
    if (spawn.spawning || spawn.room.energyAvailable < 300) {
      return false;
    }
    var body = Harvester.getBody(spawn.room, sourceId);
    var creepMemory = {
      type: "Harvester",
      room: room.name,
      roleMem: {
        source: sourceId
      },
      working: false
    };
    var name = "Harvester" + "-" + spawn.name + "=" + sourceId + "-" + Game.time;
    var result = spawn.spawnCreep(body, name, {
      memory: creepMemory
    });
    if (result == OK) {
      room.memory.harvesters[sourceId] = "spawning";
      return true;
    } else {
      console.log("Failed to spawn harvester with error", result);
    }
    return false;
  }
}
