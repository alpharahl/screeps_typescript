import { RoomUtils } from "utils/RoomUtils";
import { RemoteHauler } from "creeps/RemoteHauler";

export class HaulerMemory {
  public static run() {
    if (!Memory.haulers) {
      Memory.haulers = {};
    }
    for (var id of Memory.sources) {
      var source = <Source>Game.getObjectById(id);
      if (source) {
        if (!RoomUtils.OwnedByMe(source.room)) {
          if (!Memory.haulers[id]) {
            Memory.haulers[id] = null;
            RemoteHauler.spawn(source, source.room);
          } else if (Memory.haulers[id] != "spawning") {
            let creep = Game.creeps[Memory.haulers[id]];
            if (!creep) {
              Memory.haulers[id] = null;
            }
          }
        }
      }
    }
  }
}
