import { CreepUtils } from "utils/CreepUtils";
import { PositionUtils } from "utils/PositionUtils";
import { RoomUtils } from "utils/RoomUtils";

export class Miner {
  public static run(creep: Creep) {
    if (!creep.ticksToLive) {
      var room = Game.rooms[creep.memory.room];
      room.memory.miner[creep.memory.roleMem.extractor] = creep.name;
    }

    let extractor = <StructureExtractor>Game.getObjectById(creep.memory.roleMem.extractor);
    if (!creep.memory.roleMem.mineral) {
      let mineral = extractor.pos.lookFor(LOOK_MINERALS)[0];
      creep.memory.roleMem.mineral = mineral.id;
    }
    let mineral = <Mineral>Game.getObjectById(creep.memory.roleMem.mineral);

    CreepUtils.setWorking(creep);

    if (creep.memory.working) {
      let terminal = <StructureTerminal>creep.room.terminal;
      let useTerminal = false;
      let storage = <StructureStorage>Game.getObjectById(creep.memory.roleMem.storage);
      // if (terminal) {
      //   if (terminal.store[creep.memory.roleMem.mineralType] < 10000) {
      //     useTerminal = true;
      //   }
      // }
      if (useTerminal) {
        if (creep.transfer(terminal, creep.memory.roleMem.mineralType) == ERR_NOT_IN_RANGE) {
          creep.moveTo(terminal);
        }
      } else {
        if (creep.transfer(storage, creep.memory.roleMem.mineralType) == ERR_NOT_IN_RANGE) {
          creep.moveTo(storage);
        }
      }
    } else {
      if (extractor.cooldown != 0) {
        return;
      }
      if (creep.harvest(mineral) == ERR_NOT_IN_RANGE) {
        creep.moveTo(mineral);
      } else {
        creep.memory.roleMem.mineralType = mineral.mineralType;
      }
    }
  }

  public static spawn(room: Room) {
    let extractors = room.find(FIND_STRUCTURES, {
      filter: struct => struct.structureType == STRUCTURE_EXTRACTOR
    });
    if (extractors.length > 0) {
      var mineral = <Mineral>room.find(FIND_MINERALS)[0];
      if (mineral.mineralAmount == 0) {
        return false;
      }
      var id = extractors[0].id;
      var creep = Game.creeps[room.memory.miner[id]];
      if (!creep) {
        return Miner.createCreep(room, id);
      }
    }
    return false;
  }

  public static getBody(spawnRoom: Room) {
    var energyAvailable = spawnRoom.energyAvailable;
    var ratio = [MOVE, WORK, CARRY];
    var ratioCost = CreepUtils.getBodyCost(ratio);
    var loops = Math.floor(energyAvailable / ratioCost);
    var moves = <Array<BodyPartConstant>>[];
    var works = <Array<BodyPartConstant>>[];
    var carrys = <Array<BodyPartConstant>>[];
    for (var i = 0; i < Math.min(loops, 8); i++) {
      moves = moves.concat([MOVE]);
      works = works.concat([WORK]);
      carrys = carrys.concat([CARRY]);
    }
    return moves.concat(works).concat(carrys);
  }

  public static createCreep(room: Room, extractor: string) {
    var spawn = RoomUtils.findBestSpawn(room);
    if (spawn.spawning || spawn.room.energyAvailable < 300) {
      return false;
    }
    var body = Miner.getBody(spawn.room);
    var creepMemory = {
      type: "Miner",
      room: room.name,
      roleMem: {
        extractor: extractor,
        storage: room.storage!.id
      },
      working: false
    };
    var name = "Miner-" + spawn.name + "-" + Game.time;
    var result = spawn.spawnCreep(body, name, {
      memory: creepMemory
    });
    if (result == OK) {
      room.memory.miner[extractor] = "spawning";
      return true;
    } else {
      console.log("Failed to spawn miner with error", result);
    }

    return false;
  }
}
