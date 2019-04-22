import { RoomUtils } from "../utils/RoomUtils";

export class SpawnQueue {
  public static init (room: Room){
    if (!room.memory.spawnQueue){
      room.memory.spawnQueue = {
        'harvesters': {},
        'remoteHaulers': {}
      }
    }
  }

  public static run(){
    for (const name in Game.rooms){
      const room = Game.rooms[name];
      if (RoomUtils.OwnedByMe(room)){
        SpawnQueue.init(room);
      }
    }
  }
}
