import { Extensions } from "./Extensions";
import { Roads } from "./roads";
import { Controller } from "./controller";

export class BuildingHandler {
  public static run() {
    if (Game.time % 50 == 0) {
      Extensions.run();
      Roads.run();
    }
    Roads.build();
    Controller.vis();

    for (const id in Game.structures) {
      const struct = Game.structures[id];
    }
  }
}
