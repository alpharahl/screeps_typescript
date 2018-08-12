import { CreepUtils } from "utils/CreepUtils";
import { RoomUtils } from "utils/RoomUtils";
import { Builder } from "./Builder";

export class Claimer {
  public static spawn(room: string) {
    let spawn = Game.spawns[0];
    Memory.spawnList.push({
      type: "Claimer",
      room: room,
      roleMem: {},
      name: "Claimer" + room,
      body: [MOVE, MOVE, CLAIM, WORK]
    });
  }

  public static run(creep: Creep) {
    if (!creep.ticksToLive && Memory.claims[creep.memory.room] == "spawning") {
      Memory.claims[creep.memory.room] = "claiming";
    }
    if (CreepUtils.moveRoom(creep)) {
      return;
    }
    if (RoomUtils.OwnedByMe(creep.room)) {
      Builder.dismantle(creep);
    } else {
      let controller = creep.room.controller!;
      if (creep.claimController(controller) == ERR_NOT_IN_RANGE) {
        creep.moveTo(controller);
      }
    }
  }
}
