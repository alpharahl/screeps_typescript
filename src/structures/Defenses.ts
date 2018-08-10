import { RoomUtils } from "utils/RoomUtils";
import { Builder } from "creeps/Builder";
export class Defenses {
  public static exteriorWalls() {
    for (var name in Game.rooms) {
      var room = Game.rooms[name];
      if (RoomUtils.OwnedByMe(room)) {
        var x = 0;
        var inWall: boolean = true;
        var rampart = false;
        for (var y = 0; y < 49; y++) {
          var pos = new RoomPosition(x, y, name);
          if (pos.lookFor("terrain")[0] != "wall") {
            rampart = !rampart;
            var buildPos = new RoomPosition(2, y, name);
            Defenses.buildWallOrRampart(buildPos, rampart);
            if (inWall) {
              buildPos = new RoomPosition(2, y - 1, name);
              rampart = !rampart;
              Defenses.buildWallOrRampart(buildPos, rampart);
              buildPos = new RoomPosition(1, y - 2, name);
              rampart = !rampart;
              Defenses.buildWallOrRampart(buildPos, rampart);

              buildPos = new RoomPosition(2, y - 2, name);
              rampart = !rampart;
              Defenses.buildWallOrRampart(buildPos, rampart);
              inWall = false;
            }
          } else {
            if (!inWall) {
              buildPos = new RoomPosition(2, y, name);
              rampart = !rampart;
              Defenses.buildWallOrRampart(buildPos, rampart);
              buildPos = new RoomPosition(1, y + 1, name);
              rampart = !rampart;
              Defenses.buildWallOrRampart(buildPos, rampart);

              buildPos = new RoomPosition(2, y + 1, name);
              rampart = !rampart;
              Defenses.buildWallOrRampart(buildPos, rampart);
              inWall = true;
            }
          }
        }

        x = 49;
        inWall = true;
        for (var y = 0; y < 49; y++) {
          var pos = new RoomPosition(x, y, name);
          if (pos.lookFor("terrain")[0] != "wall") {
            buildPos = new RoomPosition(47, y - 1, name);
            rampart = !rampart;
            Defenses.buildWallOrRampart(buildPos, rampart);
            if (inWall) {
              buildPos = new RoomPosition(47, y, name);
              rampart = !rampart;
              Defenses.buildWallOrRampart(buildPos, rampart);
              buildPos = new RoomPosition(48, y - 1, name);
              rampart = !rampart;
              Defenses.buildWallOrRampart(buildPos, rampart);
              buildPos = new RoomPosition(47, y - 2, name);
              rampart = !rampart;
              Defenses.buildWallOrRampart(buildPos, rampart);
              inWall = false;
            }
          } else {
            if (!inWall) {
              buildPos = new RoomPosition(47, y, name);
              rampart = !rampart;
              Defenses.buildWallOrRampart(buildPos, rampart);
              buildPos = new RoomPosition(47, y + 1, name);
              rampart = !rampart;
              Defenses.buildWallOrRampart(buildPos, rampart);
              buildPos = new RoomPosition(48, y + 1, name);
              rampart = !rampart;
              Defenses.buildWallOrRampart(buildPos, rampart);
              inWall = true;
            }
          }
        }

        var y = 49;
        inWall = true;
        for (var x = 0; x < 49; x++) {
          var pos = new RoomPosition(x, y, name);
          if (pos.lookFor("terrain")[0] != "wall") {
            buildPos = new RoomPosition(x, 47, name);
            rampart = !rampart;
            Defenses.buildWallOrRampart(buildPos, rampart);
            if (inWall) {
              buildPos = new RoomPosition(x - 1, 47, name);
              rampart = !rampart;
              Defenses.buildWallOrRampart(buildPos, rampart);
              buildPos = new RoomPosition(x - 2, 48, name);
              rampart = !rampart;
              Defenses.buildWallOrRampart(buildPos, rampart);
              buildPos = new RoomPosition(x - 2, 47, name);
              rampart = !rampart;
              Defenses.buildWallOrRampart(buildPos, rampart);
              inWall = false;
            }
          } else {
            if (!inWall) {
              buildPos = new RoomPosition(x, 47, name);
              rampart = !rampart;
              Defenses.buildWallOrRampart(buildPos, rampart);
              buildPos = new RoomPosition(x + 1, 48, name);
              rampart = !rampart;
              Defenses.buildWallOrRampart(buildPos, rampart);
              buildPos = new RoomPosition(x + 1, 47, name);
              rampart = !rampart;
              Defenses.buildWallOrRampart(buildPos, rampart);
              inWall = true;
            }
          }
        }

        var y = 0;
        inWall = true;
        for (var x = 0; x < 49; x++) {
          var pos = new RoomPosition(x, y, name);
          if (pos.lookFor("terrain")[0] != "wall") {
            buildPos = new RoomPosition(x, 2, name);
            rampart = !rampart;
            Defenses.buildWallOrRampart(buildPos, rampart);
            if (inWall) {
              buildPos = new RoomPosition(x, 2, name);
              rampart = !rampart;
              Defenses.buildWallOrRampart(buildPos, rampart);
              buildPos = new RoomPosition(x + 1, 1, name);
              rampart = !rampart;
              Defenses.buildWallOrRampart(buildPos, rampart);

              buildPos = new RoomPosition(x + 1, 2, name);
              rampart = !rampart;
              Defenses.buildWallOrRampart(buildPos, rampart);
              inWall = false;
            }
          } else {
            if (!inWall) {
              buildPos = new RoomPosition(x, 2, name);
              rampart = !rampart;
              Defenses.buildWallOrRampart(buildPos, rampart);
              buildPos = new RoomPosition(x + 1, 1, name);
              rampart = !rampart;
              Defenses.buildWallOrRampart(buildPos, rampart);
              inWall = true;
            }
          }
        }
      }
    }
  }
  public static run() {
    Defenses.exteriorWalls();
    Defenses.towerSpawnRamparts();
  }

  public static towerSpawnRamparts() {
    for (var n in Game.structures) {
      var struct = Game.structures[n];
      if (struct.structureType == STRUCTURE_TOWER || struct.structureType == STRUCTURE_SPAWN) {
        struct.pos.createConstructionSite(STRUCTURE_RAMPART);
      }
    }
  }

  private static buildWallOrRampart(pos: RoomPosition, rampart: Boolean) {
    var room = Game.rooms[pos.roomName];
    if (pos.lookFor("terrain")[0] != "wall") {
      if (rampart) {
        pos.createConstructionSite(STRUCTURE_RAMPART);
      } else {
        pos.createConstructionSite(STRUCTURE_WALL);
      }
    }
  }
}
