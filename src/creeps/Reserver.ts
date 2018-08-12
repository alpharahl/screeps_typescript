export class Reserver {
  public static spawn(room: string) {
    let spawn = Game.spawns[0];
    Memory.spawnList.push({
      type: "Reserver",
      room: room,
      roleMem: {
        ticksToReplace: 0
      },
      name: "Reserver" + room,
      body: [MOVE, MOVE, CLAIM]
    });
  }

  public static run(creep: Creep) {
    if (!creep.ticksToLive) {
      Memory.reserves[creep.memory.room] = creep.name;
    }
    if (creep.ticksToLive == creep.memory.roleMem.ticksToReplace + 25) {
      Memory.reserves[creep.memory.room] = "replace";
    }
    if (creep.room.name != creep.memory.room) {
      creep.moveTo(new RoomPosition(25, 25, creep.memory.room));
      creep.memory.roleMem.ticksToReplace += 1;
    } else {
      let controller = creep.room.controller!;
      if (creep.reserveController(controller) == ERR_NOT_IN_RANGE) {
        creep.moveTo(controller);
        creep.memory.roleMem.ticksToReplace += 1;
      }
    }
  }
}
