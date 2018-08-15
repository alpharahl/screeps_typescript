import { CREEP_PRIORITY } from "../constants";
import { Harvester } from "./Harvester";
import { SpawnHauler } from "./SpawnHauler";
import { Builder } from "./Builder";
import { Upgrader } from "./Upgrader";
import { Reserver } from "./Reserver";
import { RemoteHauler } from "./RemoteHauler";
import { Claimer } from "./Claimer";

export class CreepSpawner {
  public static run() {
    // Run for each room I can see
    if (Game.time % 2 == 0) {
      for (var name in Game.rooms) {
        let room = Game.rooms[name];
        let spawned = false;
        for (var role of CREEP_PRIORITY) {
          if (spawned) {
            break;
          }
          switch (role) {
            case "Harvester":
              spawned = Harvester.spawn(room);
              break;
            case "SpawnHauler":
              spawned = SpawnHauler.spawn(room);
              break;
            // case "LocalHauler":
            //   break;
            case "Builder":
              spawned = Builder.spawn(room);
              break;
            case "Upgrader":
              spawned = Upgrader.spawn(room);
              break;
            // case "Reserver":
            //   break;
            // case "RemoteHauler":
            //   break;
            // case "Claimer":
            //   break;
          }
        }
      }
    }
  }
}
