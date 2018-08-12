import { PositionUtils } from "utils/PositionUtils";

export class Extensions {
  public static run() {
    for (let name in Game.rooms) {
      var room = Game.rooms[name];
      if (room.controller && room.controller.owner && room.controller.owner.username == "alpha-rahl") {
        let controllerLevel = room.controller.level;
        let neededExtensions = CONTROLLER_STRUCTURES["extension"][controllerLevel];
        let currentExtensions = room.find(FIND_MY_STRUCTURES, {
          filter: i => i.structureType == STRUCTURE_EXTENSION
        }).length;
        currentExtensions += room.find(FIND_CONSTRUCTION_SITES, {
          filter: i => i.structureType == STRUCTURE_EXTENSION
        }).length;
        if (neededExtensions != currentExtensions) {
          neededExtensions = neededExtensions - currentExtensions;
          console.log("I need to build", neededExtensions, "extensions in room", name);
          let validLocations = Extensions.getValidLocations(room.find(FIND_MY_SPAWNS)[0], neededExtensions);
          let spawnPos = room.find(FIND_MY_SPAWNS)[0].pos;
          for (let i = 0; i < neededExtensions; i++) {
            let pos = validLocations[i];
            if (pos) {
              pos.createConstructionSite(STRUCTURE_EXTENSION);
            }
          }
        }
      }
    }
  }

  public static getValidLocations(spawn: StructureSpawn, needed: number) {
    let validLocations = <Array<RoomPosition>>[];
    var radius = 0;
    var spawnPos = spawn.pos;
    while (validLocations.length < needed) {
      for (var x = -1 * radius; x < radius; x++) {
        for (var y = -1 * radius; y < radius; y++) {
          if (Extensions.roadCheck(x, y)) {
            var pos = new RoomPosition(spawnPos.x + x, spawnPos.y + y, spawnPos.roomName);
            var sites = pos.lookFor(LOOK_CONSTRUCTION_SITES);
            var structs = pos.lookFor(LOOK_STRUCTURES);
            var terrain = pos.lookFor(LOOK_TERRAIN);
            if (sites.length == 0 && structs.length == 0) {
              if (terrain[0] != "wall") {
                let exists = false;
                for (var n of validLocations) {
                  if (PositionUtils.compareTwo(n, pos)) {
                    exists = true;
                  }
                }
                if (!exists) {
                  validLocations.push(pos);
                }
              }
            }
          }
        }
      }
      radius++;
    }
    return validLocations;
  }

  public static roadCheck(x: number, y: number) {
    if (x == 0 || y == 0 || (Math.abs(x) + Math.abs(y)) % 2 != 0) {
      return false;
    } else {
      return true;
    }
  }
}
