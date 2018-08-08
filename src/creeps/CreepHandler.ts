import { Harvester } from "./Harvester";
import { Generic } from "./Generic";

export class CreepHandler {
  public static run() {
    // spawn creeps
    Harvester.spawn();
    Generic.spawn();

    for (let name in Game.creeps) {
      let creep = Game.creeps[name];
      switch (creep.memory.type) {
        case "Harvester":
          Harvester.run(creep);
          break;
        case "Generic":
          Generic.run(creep);
          break;
      }
    }
  }
}
