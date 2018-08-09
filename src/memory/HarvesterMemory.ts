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
          console.log("I didn't find the harvester for:", sourceId);
          Harvester.spawn(sourceId);
          Memory.harvesters[sourceId] = "spawning";
        }
      }
    }
  }
}
