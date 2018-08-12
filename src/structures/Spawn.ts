import { RoomUtils } from "utils/RoomUtils";

export class SpawnBuilder {
  public static run() {
    for (let name in Game.rooms) {
      var room = Game.rooms[name];
      if (RoomUtils.OwnedByMe(room) && room.controller && room.controller.owner) {
        var spawns = room.find(FIND_MY_SPAWNS);
        var spawnSites = room.find(FIND_CONSTRUCTION_SITES);
        if (spawns.length == 0 && spawnSites.length == 0) {
          spawns = room.find(FIND_HOSTILE_SPAWNS);
          if (spawns.length == 0) {
            // no friendly or hostile spawns in here
            let paths = <Array<any>>[];
            let controller = room.controller!;
            for (let source of room.find(FIND_SOURCES)) {
              let path = source.pos.findPathTo(controller);
              paths.push(path);
            }
            var ideal = controller.pos;
            if (paths.length == 1) {
              var path = paths[0][paths[0].length / 2];
              ideal = new RoomPosition(path.x, path.y, room.name);
              ideal.createConstructionSite(STRUCTURE_SPAWN);
            } else {
              ideal = new RoomPosition(paths[0][paths[0].length / 2].x, paths[0][paths[0].length / 2].y, room.name);
              var found = false;
              for (let step of paths[0]) {
                if (!found) {
                  var secondPath = paths[1];
                  for (var n of secondPath) {
                    if (step.x == n.x && step.y == n.y) {
                      ideal = new RoomPosition(step.x, step.y, room.name);
                      found = true;
                    }
                  }
                }
              }
              ideal.createConstructionSite(STRUCTURE_SPAWN);
            }
          }
        }
      }
    }
  }
}
