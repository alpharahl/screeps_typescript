export class PositionUtils {
  public static compareTwo(pos1: RoomPosition, pos2: RoomPosition) {
    if (pos1.x == pos2.x && pos1.y == pos2.y && pos1.roomName == pos2.roomName) {
      return true;
    } else {
      return false;
    }
  }

  public static getPosFromMem(memPos: any) {
    if (!memPos) {
      return;
    }
    return new RoomPosition(memPos.x, memPos.y, memPos.roomName);
  }

  public static getClosestSpawn(pos: RoomPosition) {
    return Game.spawns[Object.keys(Game.spawns)[0]];
  }

  public static getNeighbor(pos: any, direction: number) {
    // direction can be 1-8, need to make sure it's between 1 & 8 when we subtract 2 from it
    direction = direction - 2;
    if (direction <= 0) {
      direction + 8;
    }

    var newPos = [[-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [-1, 1], [-1, 0], [-1, -1]][direction - 1];
    if (!newPos) {
      console.log("direction evaluated to: ", direction, direction - 1);
      return;
    }
    return new RoomPosition(pos.x + newPos[0], pos.y + newPos[1], pos.roomName);
  }

  public static getNextTo(
    pos: RoomPosition,
    structureType: StructureConstant,
    construction: boolean = false,
    range: number = 1
  ) {
    let find = <FindConstant>FIND_STRUCTURES;
    if (construction) {
      find = FIND_CONSTRUCTION_SITES;
    }
    // pos = position to search next to
    return <Array<Structure>>pos.findInRange(find, range, {
      filter: (struct: Structure) => struct.structureType == structureType
    });
  }
}
