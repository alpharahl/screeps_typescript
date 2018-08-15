import { CreepUtils } from "utils/CreepUtils";

export class Upgrader {
  public static run(creep: Creep) {
    CreepUtils.setWorking(creep);
    if (creep.memory.working) {
      CreepUtils.upgrade(creep);
    } else {
      CreepUtils.withdraw(creep);
    }
  }

  public static spawn(roomName: string) {
    let room = Game.rooms[roomName];
    let maxEnergy = room.energyCapacityAvailable;
    let body = <Array<BodyPartConstant>>[MOVE, MOVE, CARRY];
    let maxWorks = 8;
    var loops = Math.min(maxWorks, Math.floor((maxEnergy - 150) / 100));
    loops = Math.max(1, loops);
    for (var i = 0; i < loops; i++) {
      body = body.concat([WORK]);
    }
    Memory.spawnList.push({
      type: "Upgrader",
      room: roomName,
      roleMem: {},
      body: body
    });
  }
}
