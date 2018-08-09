import { CreepUtils } from "utils/CreepUtils";

export class Upgrader {
  public static run(creep: Creep) {
    CreepUtils.setWorking(creep);
    if (creep.memory.working) {
      CreepUtils.upgrade(creep);
    } else {
      CreepUtils.pickup(creep);
    }
  }

  public static spawn(roomName: string) {
    console.log("Spawning an upgrader for room", roomName);
    let room = Game.rooms[roomName];
    let maxEnergy = room.energyCapacityAvailable;
    let body = <Array<BodyPartConstant>>[MOVE, MOVE, CARRY];
    let maxWorks = 7;
    var loops = Math.min(maxWorks, Math.floor((maxEnergy - 150) / 100));
    for (var i = 0; i < loops; i++) {
      body = body.concat([WORK]);
    }
    Memory.spawnList.push({
      type: "Upgrader",
      room: roomName,
      roleMem: {},
      name: "Upgrader" + Game.time,
      body: body
    });
  }
}
