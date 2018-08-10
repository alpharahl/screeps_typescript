import { RoomUtils } from "utils/RoomUtils";

export class Towers {
  public static build() {
    for (var name in Game.rooms) {
      var room = Game.rooms[name];
      if (RoomUtils.OwnedByMe(room)) {
        let controller = room.controller!;
        var towerNumPossible = CONTROLLER_STRUCTURES["tower"][controller.level];
        var towerCount = room.find(FIND_MY_STRUCTURES, {
          filter: s => s.structureType == STRUCTURE_TOWER
        }).length;
        towerCount += room.find(FIND_CONSTRUCTION_SITES, {
          filter: s => s.structureType == STRUCTURE_TOWER
        }).length;
        if (towerCount < towerNumPossible) {
          while (towerCount < towerNumPossible) {
            let spawn = room.find(FIND_MY_SPAWNS)[0];
            let path = room.findPath(spawn.pos, controller.pos, { ignoreCreeps: true });
            let middleStep = path[path.length / 2 + towerCount];
            let pos = new RoomPosition(middleStep.x, middleStep.y, room.name);
            pos.createConstructionSite(STRUCTURE_TOWER);
            towerCount++;
          }
        }
      }
    }
  }

  public static run() {
    for (var name in Game.rooms) {
      var room = Game.rooms[name];
      if (RoomUtils.OwnedByMe(room)) {
        let towers = <Array<StructureTower>>(
          room.find(FIND_STRUCTURES, { filter: struct => struct.structureType == STRUCTURE_TOWER })
        );
        for (let tower of towers) {
          var hostileCreeps = room.find(FIND_HOSTILE_CREEPS);
          if (hostileCreeps.length > 0) {
            tower.attack(hostileCreeps[0]);
          } else {
            let level = 1;
            if (room.controller) {
              level = Math.max(room.controller.level, level);
            }
            var repairTargets = room.find(FIND_STRUCTURES, {
              filter: struct =>
                (struct.structureType != STRUCTURE_WALL &&
                  struct.structureType != STRUCTURE_RAMPART &&
                  struct.hits < struct.hitsMax) ||
                ((struct.structureType == STRUCTURE_WALL || struct.structureType == STRUCTURE_RAMPART) &&
                  struct.hits < 25000 * level)
            });
            let sortedTargets = repairTargets.sort(
              (leftSide, rightSide): number => {
                if (leftSide.hits < rightSide.hits) return -1;
                if (leftSide.hits > rightSide.hits) return 1;
                return 0;
              }
            );
            if (repairTargets.length > 0 && tower.energy > 200) {
              tower.repair(sortedTargets[0]);
            }
          }
        }
      }
    }
  }
}
