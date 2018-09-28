import { RoomUtils } from "utils/RoomUtils";
import { Miner } from "creeps/Miner";

export class MinerMemory {
  public static init(room: Room) {
    if (!room.memory.mine) {
      room.memory.mine = "";
    }
    if (!room.memory.miner) {
      room.memory.miner = {};
    }
  }

  public static run() {
    for (var name in Game.rooms) {
      var room = Game.rooms[name];
      MinerMemory.init(room);
    }
  }
}
