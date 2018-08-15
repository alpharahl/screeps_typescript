import { CREEP_PRIORITY } from "../constants";
import { Harvester } from "./Harvester";
import { SpawnHauler } from "./SpawnHauler";

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
          }
        }
      }
    }
  }
}
