import { CreepUtils } from "utils/CreepUtils";
import { RoomUtils } from "utils/RoomUtils";
import { Builder } from "./Builder";

export class Claimer {
  public static spawn() {
    for (var name in Memory.claims) {
      if (Memory.claims[name] == true) {
        let spawn = Game.spawns[Object.keys(Game.spawns)[1]];
        var result = spawn.spawnCreep([MOVE, MOVE, CLAIM, WORK], "Claimer-" + name + "-" + spawn.name, {
          memory: {
            type: "Claimer",
            room: name,
            roleMem: {},
            working: false
          }
        });
        if (result == OK) {
          Memory.claims[name] = "spawning";
          return true;
        }
      }
    }
    return false;
  }
  //Game.spawns['Spawn4'].spawnCreep([MOVE,MOVE,CLAIM,WORK], "Claimer",{memory:{type:"Claimer",room:"W37N57"}})

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
