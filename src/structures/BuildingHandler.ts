import { Extensions } from "./Extensions";
import { Roads } from "./Roads";
import { Controller } from "./Controller";
import { Storages } from "./Storage";
import { Towers } from "./Towers";
import { Defenses } from "./Defenses";
import { RoomUtils } from "utils/RoomUtils";
import { SpawnBuilder } from "./Spawn";

export class BuildingHandler {
  public static run() {
    if (Game.time % 50 == 0) {
      Extensions.run();
      Roads.run();
      Storages.placeContainers();
      Storages.buildStorage();
      // Defenses.run();
    }
    Roads.build();
    Controller.vis();
    Towers.build();
    Towers.run();
    SpawnBuilder.run();

    RoomUtils.ClearSites();
  }
}
