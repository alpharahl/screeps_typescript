import { CreepUtils } from "utils/CreepUtils";

export class SpawnHauler {
  public static run(creep: Creep) {
    if (!creep.ticksToLive || creep.ticksToLive > 200) {
      var room = creep.room;
      if (room.memory.spawnHaulers.indexOf(creep.name) == -1) {
        room.memory.spawnHaulers.push(creep.name);
        var ind = room.memory.spawnHaulers.indexOf("spawning");
        if (ind != -1) {
          room.memory.spawnHaulers.splice(ind, 1);
        }
      }
    }

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
    loops = Math.min(loops, 5);
    loops = Math.max(1, loops);
    for (let i = 0; i < loops; i++) {
      body = body.concat(ratio);
    }

    var length = Memory.spawnList.length;
    Memory.spawnList.unshift({
      type: "SpawnHauler",
      room: roomName,
      roleMem: {},
      name: "SpawnHauler" + Game.time,
      body: body
    });
    if (Memory.spawnList.length == length) {
      console.log("ERR: Failed to schedule spawn hauler");
      return false;
    }
    return true;
  }
}
