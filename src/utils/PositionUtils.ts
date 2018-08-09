export class PositionUtils {
  public static compareTwo(pos1: RoomPosition, pos2: RoomPosition) {
    if (pos1.x == pos2.x && pos1.y == pos2.y && pos1.roomName == pos2.roomName) {
      return true;
    } else {
      return false;
    }
  }

  public static getPosFromMem(memPos: any) {
    return new RoomPosition(memPos.x, memPos.y, memPos.roomName);
  }

  public static getNeighbor(pos: any, direction: number) {
    var newPos = [[-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [-1, 1], [-1, 0], [-1, -1]][direction - 1];
    return new RoomPosition(pos.x + newPos[0], pos.y + newPos[1], pos.roomName);
  }
}
