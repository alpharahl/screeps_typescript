import { CREEP_PRIORITY } from "../constants";
import { Harvester } from "./Harvester";
import { SpawnHauler } from "./SpawnHauler";
import { Builder } from "./Builder";
import { Upgrader } from "./Upgrader";
import { Reserver } from "./Reserver";
import { RemoteHauler } from "./RemoteHauler";
import { Claimer } from "./Claimer";
import { Miner } from "./Miner";
import { LocalHauler } from "./LocalHauler";
import { LinkMover } from "./LinkMover";
import { Dismantler } from "./Dismantler";

export class CreepSpawner {
  public static run() {
    // Run for each room I can see
    Memory.spawns = [];
    if (Game.time % 25 == 0) {
      for (var name in Game.rooms) {
        let room = Game.rooms[name];
        if (room.controller && room.controller.owner && room.controller.owner.username != "alpha-rahl") {
          continue;
        }
        let spawned = false;
        for (var role of CREEP_PRIORITY) {
          if (spawned) {
            break;
          }
          try {
            switch (role) {
              case "Harvester":
                spawned = Harvester.spawn(room);
                break;
              case "SpawnHauler":
                spawned = SpawnHauler.spawn(room);
                break;
              case "LocalHauler":
                spawned = LocalHauler.spawn(room);
                break;
              case "Builder":
                spawned = Builder.spawn(room);
                break;
              case "Upgrader":
                spawned = Upgrader.spawn(room);
                break;
              case "Reserver":
                spawned = Reserver.spawn(room);
                break;
              case "RemoteHauler":
                spawned = RemoteHauler.spawn(room);
                break;
              case "Claimer":
                spawned = Claimer.spawn();
                break;
              case "Miner":
                spawned = Miner.spawn(room);
                break;
              case "LinkMover":
                spawned = LinkMover.spawn(room);
                break;
              case "Dismantler":
                spawned = Dismantler.spawn(room);
                break;
            }
          } catch (e) {
            console.error("spawning failed");
          }
        }
      }
    }
  }
}
