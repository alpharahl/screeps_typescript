import { RoomUtils } from "utils/RoomUtils";

export class Sources {
  public static init(room: Room) {
    if (!room.memory.sources) {
      room.memory.sources = [];
      for (var source of room.find(FIND_SOURCES)) {
        room.memory.sources.push(source.id);
      }
    }
    if (!room.memory.harvesters) {
      room.memory.harvesters = [];
    }
    if (room.controller!.owner) {
      if (!room.memory.localHaulers) {
        room.memory.localHaulers = [];
      }
    } else {
      if (!room.memory.remoteHaulers) {
        room.memory.remoteHaulers = [];
      }
    }
  }

  public static run() {
    for (var name in Game.rooms) {
      var room = Game.rooms[name];
      if (RoomUtils.OwnedByMe(room)) {
        Sources.init(room);
        for (let sourceId of room.memory.sources) {
          Sources.clearCreeps(room, sourceId);
        }
      }
    }
  }

  public static clearCreeps(room: Room, sourceId: string) {
    let harvester = Game.creeps[room.memory.harvesters[sourceId]];
    let localHauler = Game.creeps[room.memory.localHaulers[sourceId]];
    let remoteHauler = Game.creeps[room.memory.remoteHaulers[sourceId]];

    if (!harvester && room.memory.harvesters[sourceId] != "spawning") {
      room.memory.harvesters[sourceId] = null;
    }
    if (!localHauler && room.memory.localHaulers[sourceId] != "spawning") {
      room.memory.localHaulers[sourceId] = null;
    }
    if (!remoteHauler && room.memory.remoteHaulers[sourceId] != "spawning") {
      room.memory.remoteHaulers[sourceId] = null;
    }
  }
}
