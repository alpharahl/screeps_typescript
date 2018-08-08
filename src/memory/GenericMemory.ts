export class GenericMemory {
  public static init() {
    if (!Memory.generic) {
      Memory.generic = {};
    }
    for (let room in Game.rooms) {
      if (!Memory.generic[room]) {
        Memory.generic[room] = {
          count: 3,
          creeps: []
        };
      }
    }
  }

  public static run() {
    for (let room in Game.rooms) {
      let roomData = Memory.generic[room];
      for (let cId of roomData.creeps) {
        if (cId == "spawning") {
          continue;
        }
        var creep = Game.creeps[cId];
        if (!creep) {
          Memory.generic[room].creeps.splice(Memory.generic[room].creeps.indexOf(cId), 1);
        }
      }
    }
  }
}
