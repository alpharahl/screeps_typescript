import { CreepUtils } from "utils/CreepUtils";

export class SpawnHauler {
  public static run(creep: Creep) {
    CreepUtils.setWorking(creep);
    if (creep.memory.working) {
      CreepUtils.fillSpawn(creep);
    } else {
      CreepUtils.pickup(creep);
    }
  }

  public static spawn(roomName: string) {
    console.log("spawning a spawnhauler for room", roomName);
    let room = Game.rooms[roomName];
    if (!room) {
      return;
    }
    //room *should* always be true, but just exit if it isn't

    let maxEnergy = room.energyCapacityAvailable;
    let body = <Array<BodyPartConstant>>[];
    let ratio = <Array<BodyPartConstant>>[MOVE, CARRY, CARRY];
    let loops = Math.floor(maxEnergy / CreepUtils.getBodyCost(ratio));
    for (let i = 0; i < loops; i++) {
      body = body.concat(ratio);
    }

    Memory.spawnList.push({
      type: "SpawnHauler",
      room: roomName,
      roleMem: {},
      name: "SpawnHauler" + Game.time,
      body: body
    });
  }
}
