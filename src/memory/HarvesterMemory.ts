import { Harvester } from "creeps/harvester";

export class HarvesterMemory {
  public static init() {
    if (!Memory.harvesters) {
      Memory.harvesters = {};
    }
  }

  public static run() {
    for (let sourceId of Memory.sources) {
      if (Memory.harvesters[sourceId] != "spawning") {
        if (!Game.creeps[Memory.harvesters[sourceId]]) {
          Memory.harvesters[sourceId] = "spawning";
        }
      } else if (Game.time % 250 == 0) {
        Memory.harvesters[sourceId] = null;
      }
    }
  }
}
