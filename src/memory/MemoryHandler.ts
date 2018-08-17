import { Sources } from "./Sources";
import { HarvesterMemory } from "./HarvesterMemory";
import { SpawnList } from "./SpawnList";
import { Rooms } from "./Rooms";
import { SpawnHaulerMemory } from "./SpawnHaulerMemory";
import { UpgraderMemory } from "./UpgraderMemory";
import { BuilderMemory } from "./BuilderMemory";
import { LocalHaulerMemory } from "./LocalHaulerMemory";

export class MemoryHandler {
  public static run() {
    Sources.run();
    HarvesterMemory.init();
    SpawnList.init();
    SpawnHaulerMemory.init();
    UpgraderMemory.init();
    BuilderMemory.init();
    if (!Memory.allies) {
      Memory.allies = [];
    }

    HarvesterMemory.run();
    SpawnList.run();
    Rooms.claims();
    Rooms.reserves();
    SpawnHaulerMemory.run();
    UpgraderMemory.run();
    BuilderMemory.run();
    LocalHaulerMemory.run();
  }
}
