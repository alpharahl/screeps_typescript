import { Harvester } from "./harvester";
import { SpawnHauler } from "./SpawnHauler";
import { Builder } from "./Builder";
import { Upgrader } from "./Upgrader";
import { Claimer } from "./Claimer";
import { RemoteHauler } from "./RemoteHauler";
import { Reserver } from "./Reserver";
import { CreepSpawner } from "./CreepSpawner";
import { LocalHauler } from "./LocalHauler";
import { Miner } from "./Miner";
import { LinkMover } from "./LinkMover";
import { Links } from "./Links";
import { Dismantler } from "./Dismantler";

export class CreepHandler {
  public static run() {
    // spawn creeps
    CreepSpawner.run();

    for (var name in Game.rooms) {
      var room = Game.rooms[name];
      Links.run(room);
    }

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
        case "Claimer":
          Claimer.run(creep);
          break;
        case "RemoteHauler":
          RemoteHauler.run(creep);
          break;
        case "Reserver":
          Reserver.run(creep);
          break;
        case "LocalHauler":
          LocalHauler.run(creep);
          break;
        case "Miner":
          Miner.run(creep);
          break;
        case "LinkMover":
          LinkMover.run(creep);
          break;
        case "Dismantler":
          Dismantler.run(creep);
          break;
      }
    }
  }
}
