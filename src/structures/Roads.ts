import { PositionUtils } from "utils/PositionUtils";

export class Roads {
  public static init(room: Room) {
    if (!room.memory.roads) {
      room.memory.roads = [];
    }
  }

  public static run() {
    for (let name in Game.rooms) {
      var room = Game.rooms[name];
      Roads.init(room);
      if (room.controller && room.controller.owner.username == "alpha-rahl") {
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
      if (room.find(FIND_CONSTRUCTION_SITES).length < 10) {
        let pos = PositionUtils.getPosFromMem(room.memory.roads.shift());
        if (pos) {
          pos.createConstructionSite(STRUCTURE_ROAD);
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
