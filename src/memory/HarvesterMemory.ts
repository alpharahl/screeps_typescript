import { Harvester } from "creeps/harvester";

export class HarvesterMemory {
  public static init() {
    if (!Memory.harvesters) {
      Memory.harvesters = {};
    }
  }

  public static run() {}
}
