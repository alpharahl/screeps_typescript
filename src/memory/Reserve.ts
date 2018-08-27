import { Reserver } from "creeps/Reserver";
import { RoomUtils } from "utils/RoomUtils";

export class Reserve {
  public static init(room: Room) {
    if (!room.memory.reserved) {
      room.memory.reserved = {};
    }
  }

  public static run() {}
}
