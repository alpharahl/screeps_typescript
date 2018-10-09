import { PositionUtils } from "utils/PositionUtils";
import { CreepUtils } from "utils/CreepUtils";
import { RoomUtils } from "utils/RoomUtils";

export class RemoteDefender {
  public static run(creep: Creep) {
    if (!creep.ticksToLive) {
      if (Game.rooms[creep.memory.room]) {
        Game.rooms[creep.memory.room].memory.defender = creep.id;
      }
    }

    if (creep.memory.room == creep.room.name) {
      this.defend(creep);
    } else {
      creep.moveTo(new RoomPosition(25, 25, creep.memory.room));
    }
  }

  public static defend(creep: Creep) {}

  public static spawn(room: Room) {
    let ratio = [TOUGH, ATTACK, MOVE];
    let spawn = RoomUtils.findBestSpawn(room);
    let roomEnergy = spawn.room.energyAvailable;
    let ratioCost = CreepUtils.getBodyCost(ratio);
    let body = <Array<BodyPartConstant>>[];
    let tough = <Array<BodyPartConstant>>[];
    let attack = <Array<BodyPartConstant>>[];
    let move = <Array<BodyPartConstant>>[];
    for (let i = 0; i < Math.floor(roomEnergy / ratioCost); i++) {
      tough.push(TOUGH);
      attack.push(ATTACK);
      move.push(MOVE);
    }
    body = tough.concat(attack).concat(move);
  }
}
