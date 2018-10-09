import { CreepUtils } from "utils/CreepUtils";
import { RoomUtils } from "utils/RoomUtils";

export class TerminalHauler {
  public static run(creep: Creep) {
    if (creep.memory.roleMem.timer > Game.time || creep.ticksToLive! <= 10) {
      creep.memory.type = "SpawnHauler";
      creep.room.memory.terminalHauler = "";
      creep.drop(creep.memory.roleMem.mineralType, creep.carryCapacity);
    }

    if (creep.memory.roleMem.mineralType == null) {
      var mineralType = creep.room.find(FIND_MINERALS)[0].mineralType;
      creep.memory.roleMem.mineralType = mineralType;
    }

    CreepUtils.setWorking(creep);
    if (creep.carry.energy > 0) {
      creep.drop(RESOURCE_ENERGY, creep.carry.energy);
    }
    if (creep.memory.working) {
      if (creep.transfer(creep.room.terminal!, creep.memory.roleMem.mineralType) == ERR_NOT_IN_RANGE) {
        creep.moveTo(creep.room.terminal!);
      }
    } else {
      if (creep.withdraw(creep.room.storage!, creep.memory.roleMem.mineralType) == ERR_NOT_IN_RANGE) {
        creep.moveTo(creep.room.storage!);
      }
    }
  }
}
