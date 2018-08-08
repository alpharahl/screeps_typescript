export class HarvesterMemory {
  public static init() {
    if (!Memory.harvesters) {
      Memory.harvesters = {};
    }
  }

  public static run() {
    for (let sourceId in Memory.harvesters) {
      var harvester = Game.getObjectById(Memory.harvesters[sourceId]);
      if (!harvester) {
        if (Memory.harvesters[sourceId] != "spawning") {
          Memory.harvesters[sourceId] = null;
        }
      }
    }
  }
}
