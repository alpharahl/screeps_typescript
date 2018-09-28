import { PositionUtils } from "utils/PositionUtils";

export class LinksBuilder {
  public static run() {
    for (let name in Game.rooms) {
      var room = Game.rooms[name];
      if (room.controller && room.controller.owner && room.controller.owner.username == "alpha-rahl") {
        if (room.controller.level >= 5) {
          LinksBuilder.initMem(room);
          if (!room.memory.links.storage) {
            if (room.storage) {
              LinksBuilder.targetLink(room, room.storage);
            }
          } else {
            var sources = room.find(FIND_SOURCES);
            for (var source of sources) {
              if (!room.memory.links[source.id]) {
                LinksBuilder.targetLink(room, source);
              }
            }
          }
        }
      }
    }
  }

  public static targetLink(room: Room, target: any) {
    var links = PositionUtils.getNextTo(target.pos, STRUCTURE_LINK, false, 2);
    if (links.length > 0) {
      if (target.structureType == STRUCTURE_STORAGE) {
        room.memory.links.storage = links[0].id;
      } else {
        room.memory.links[target.id] = links[0].id;
      }
    } else {
      var sites = PositionUtils.getNextTo(target.pos, STRUCTURE_LINK, true, 2);
      if (sites.length > 0) {
        return;
      }
      var spawn = room.find(FIND_MY_SPAWNS)[0];
      var loc = room.findPath(target.pos, spawn.pos, { ignoreCreeps: true })[1];
      LinksBuilder.build(new RoomPosition(loc.x, loc.y, room.name));
    }
  }

  public static build(pos: RoomPosition) {
    // var room = Game.rooms[pos.roomName];
    // room.visual.circle(pos.x, pos.y);
    pos.createConstructionSite(STRUCTURE_LINK);
  }

  public static initMem(room: Room) {
    if (!room.memory.links) {
      room.memory.links = {};
    }
  }
}
