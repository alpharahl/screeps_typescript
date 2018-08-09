import { Harvester } from "./harvester";
import { SpawnHauler } from "./SpawnHauler";
import { Builder } from "./Builder";
import { Upgrader } from "./Upgrader";

export class CreepHandler {
  public static run() {
    // spawn creeps

    for (let name in Game.creeps) {
      let creep = Game.creeps[name];
      switch (creep.memory.type) {
        case "Harvester":
          Harvester.run(creep);
          break;
        case "SpawnHauler":
          SpawnHauler.run(creep);
          break;
        case "Builder":
          Builder.run(creep);
          break;
        case "Upgrader":
          Upgrader.run(creep);
          break;
      }
    }
  }
}
