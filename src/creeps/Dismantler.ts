import { RoomUtils } from "utils/RoomUtils";

export class Dismantler {
  public static run(creep: Creep) {
    if (creep.room.name == creep.memory.room) {
      var room = creep.room;
      var walls = creep.pos.findClosestByPath(FIND_STRUCTURES, {
        filter: (struct: Structure) => struct.structureType == STRUCTURE_WALL
      });
      if (walls) {
        if (creep.dismantle(walls) == ERR_NOT_IN_RANGE) {
          creep.moveTo(walls);
        }
      } else {
        creep.suicide();
      }
    } else {
      creep.moveTo(new RoomPosition(25, 25, creep.memory.room));
    }
  }

  public static spawn(room: Room) {
    if (room.controller && room.controller.reservation && room.controller.reservation.username == "alpha-rahl") {
      var walls = room.find(FIND_STRUCTURES, {
        filter: (struct: Structure) => struct.structureType == STRUCTURE_WALL
      });
      if (walls.length > 0) {
        var dismantler = room.find(FIND_MY_CREEPS, {
          filter: (creep: Creep) => creep.memory.type == "Dismantler"
        });
        if (!dismantler) {
          return Dismantler.createCreep(room);
        }
      }
    }
    return false;
  }

  public static createCreep(room: Room) {
    var spawn = RoomUtils.findBestSpawn(room);
    var body = [MOVE, MOVE, MOVE, MOVE, MOVE, CARRY, CARRY, WORK, WORK, WORK, WORK];
    var creepMemory = {
      type: "Dismantler",
      room: room.name,
      roleMem: {},
      working: false
    };
    var name = "Dismantler" + spawn.name;
    var result = spawn.spawnCreep(body, name, {
      memory: creepMemory
    });

    if (result == OK) {
      return true;
    } else {
      return false;
    }
  }
}
