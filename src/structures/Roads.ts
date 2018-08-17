import { PositionUtils } from "utils/PositionUtils";
import { RoomUtils } from "utils/RoomUtils";

export class Roads {
  public static init(room: Room) {
    if (!room.memory.roads) {
      room.memory.roads = [];
    }
  }

  public static run() {
    Roads.connectionRoads();
    Roads.extensionRoads();
  }

  public static extensionRoads() {
    for (let name in Game.rooms) {
      var room = Game.rooms[name];
      if (RoomUtils.OwnedByMe(room) && room.find(FIND_MY_SPAWNS).length > 0) {
        var extensions = room.find(FIND_MY_STRUCTURES, {
          filter: struct => struct.structureType == STRUCTURE_EXTENSION || struct.structureType == STRUCTURE_STORAGE
        });
        for (var extension of extensions) {
          var roadSlots = <Array<RoomPosition>>[];
          let pos = extension.pos;
          roadSlots.push(new RoomPosition(pos.x + 1, pos.y, pos.roomName));
          roadSlots.push(new RoomPosition(pos.x - 1, pos.y, pos.roomName));
          roadSlots.push(new RoomPosition(pos.x, pos.y - 1, pos.roomName));
          roadSlots.push(new RoomPosition(pos.x, pos.y + 1, pos.roomName));
          for (let position of roadSlots) {
            let exists = false;
            for (let testPos of room.memory.roads) {
              if (PositionUtils.compareTwo(position, new RoomPosition(testPos.x, testPos.y, testPos.roomName))) {
                exists = true;
              }
            }
            if (exists == false) {
              if (position.lookFor("terrain")[0] == "swamp") {
                room.memory.roads.unshift(position);
              } else if (position.lookFor("terrain")[0] == "plain") {
                room.memory.roads.push(position);
              }
            }
          }
        }
      }
    }
  }

  public static connectionRoads() {
    for (let name in Game.rooms) {
      var room = Game.rooms[name];
      Roads.init(room);
      if (
        room.controller &&
        room.controller.owner &&
        room.controller.owner.username == "alpha-rahl" &&
        room.find(FIND_MY_SPAWNS).length > 0
      ) {
        var sources = room.find(FIND_SOURCES);
        var controller = room.controller;
        var spawns = room.find(FIND_MY_SPAWNS);
        for (let source of sources) {
          // path sources to controller & spawns
          Roads.findPath(source.pos, controller.pos, room);
          for (let spawn of spawns) {
            Roads.findPath(source.pos, spawn.pos, room);
          }
        }
        //now link controller and spawn
        for (let spawn of spawns) {
          Roads.findPath(spawn.pos, controller.pos, room);
        }
      }
    }
  }

  public static build() {
    for (let name in Game.rooms) {
      var room = Game.rooms[name];
      if (RoomUtils.OwnedByMe(room)) {
        Roads.init(room);
        if (room.find(FIND_MY_SPAWNS).length > 0) {
          if (room.find(FIND_CONSTRUCTION_SITES).length < 10) {
            let pos = PositionUtils.getPosFromMem(room.memory.roads.shift());
            if (pos) {
              pos.createConstructionSite(STRUCTURE_ROAD);
            }
          }
        }
      }
    }
  }

  private static findPath(source: RoomPosition, to: RoomPosition, room: Room) {
    let path = room.findPath(source, to, {
      ignoreCreeps: true,
      swampCost: 1
    });

    for (let pos of path) {
      var exists = false;
      for (var testPos of room.memory.roads) {
        if (PositionUtils.compareTwo(new RoomPosition(pos.x, pos.y, room.name), testPos)) {
          exists = true;
        }
      }
      if (!exists) {
        var rPos = new RoomPosition(pos.x, pos.y, room.name);

        if (rPos.lookFor("terrain")[0] == "swamp") {
          room.memory.roads.unshift(rPos);
        } else {
          room.memory.roads.push(rPos);
        }
        if (!rPos || !pos.direction) {
          continue;
        }
        var neighbor = PositionUtils.getNeighbor(rPos, pos.direction + 1);
        if (!neighbor) {
          continue;
        }
        if (neighbor.lookFor("terrain")[0] == "swamp") {
          room.memory.roads.unshift(neighbor);
        } else if (neighbor.lookFor("terrain")[0] != "wall") {
          room.memory.roads.push(neighbor);
        }
      }
    }
  }
}
