import { Extensions } from "./Extensions";
import { Roads } from "./roads";

export class BuildingHandler {
  public static run() {
    if (Game.time % 50 == 0) {
      Extensions.run();
      Roads.run();
    }
    Roads.build();

    for (const id in Game.structures) {
      const struct = Game.structures[id];
    }
  }
}
