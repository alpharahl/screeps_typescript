import { RoomUtils } from "utils/RoomUtils";

export class Reserver {
  public static spawn(room: Room) {
    if (RoomUtils.OwnedByMe(room) && room.controller!.owner) {
      Reserver.init(room);
      for (var resRoom in room.memory.reserved) {
        let status = room.memory.reserved[resRoom];
        if (!status || status == "replace") {
          return Reserver.createCreep(resRoom, room);
        } else if (status != "spawning") {
          var creep = Game.creeps[status];
          if (!creep) {
            return Reserver.createCreep(resRoom, room);
          }
        }
      }
    }
    return false;
  }

  public static init(room: Room) {
    if (!room.memory.reserved) {
      room.memory.reserved = {};
    }
  }

  public static createCreep(targetRoom: string, spawnRoom: Room) {
    console.log("trying to spawn a resrever for", targetRoom, "in", spawnRoom);
    var spawn = RoomUtils.findBestSpawn(spawnRoom);

    // 2 moves to deal with swamp
    var body = [MOVE, MOVE, CLAIM];
    var memory = {
      type: "Reserver",
      room: targetRoom,
      roleMem: {
        travelTime: 0,
        spawnRoom: spawnRoom.name
      },
      working: false
    };
    var name = "Reserver-" + targetRoom + "-" + spawnRoom.name + "-" + Game.time;
    var result = spawn.spawnCreep(body, name, { memory: memory });
    if (result == OK) {
      spawnRoom.memory.reserved[targetRoom] = "spawning";
      return true;
    } else {
      console.log("Failed to spawn local hauler with error", result);
    }
    return false;
  }

  public static run(creep: Creep) {
    if (!creep.ticksToLive) {
      creep.room.memory.reserved[creep.memory.room] = creep.name;
      creep.memory.roleMem.travelTime += 1;
      return;
    } else if (creep.ticksToLive == creep.memory.roleMem.travelTime) {
      var room = Game.rooms[creep.memory.roleMem.spawnRoom];
      if (room) {
        room.memory.reserved[creep.memory.room] = "replace";
      }
    }

    if (creep.room.name != creep.memory.room) {
      creep.moveTo(new RoomPosition(25, 25, creep.memory.room));
      creep.memory.roleMem.travelTime += 1;
    } else {
      var controller = creep.room.controller!;
      if (creep.reserveController(controller) == ERR_NOT_IN_RANGE) {
        creep.moveTo(controller);
        creep.memory.roleMem.travelTime += 1;
      }
    }
  }
}
