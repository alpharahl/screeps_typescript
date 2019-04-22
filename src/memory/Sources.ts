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
      room.memory.harvesters = {};
    } else {
      if (!room.memory.remoteHaulers) {
        room.memory.remoteHaulers = {};
      }
    }
  }

  public static run() {
    for (var name in Game.rooms) {
      var room = Game.rooms[name];
      if (RoomUtils.OwnedByMe(room)) {
        Sources.init(room);
      }
    }
  }
}
