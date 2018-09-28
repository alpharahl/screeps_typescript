import { Extensions } from "./Extensions";
import { Roads } from "./Roads";
import { Controller } from "./Controller";
import { Storages } from "./Storage";
import { Towers } from "./Towers";
import { Defenses } from "./Defenses";
import { RoomUtils } from "utils/RoomUtils";
import { SpawnBuilder } from "./Spawn";
import { LinksBuilder } from "./Links";

export class BuildingHandler {
  public static run() {
    if (Game.time % 50 == 0) {
      Extensions.run();
    } else if (Game.time % 50 == 10) {
      Roads.run();
    } else if (Game.time % 50 == 20) {
      Storages.placeContainers();
      Storages.buildStorage();
    }
    Roads.build();
    Controller.vis();
    Towers.build();
    Towers.run();
    SpawnBuilder.run();
    LinksBuilder.run();

    RoomUtils.ClearSites();
  }
}
