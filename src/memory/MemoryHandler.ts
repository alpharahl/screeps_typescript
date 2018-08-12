import { Sources } from "./Sources";
import { HarvesterMemory } from "./HarvesterMemory";
import { SpawnList } from "./SpawnList";
import { Rooms } from "./Rooms";
import { SpawnHaulerMemory } from "./SpawnHaulerMemory";
import { UpgraderMemory } from "./UpgraderMemory";
import { BuilderMemory } from "./BuilderMemory";
import { HaulerMemory } from "./HaulerMemory";

export class MemoryHandler {
  public static run() {
    Sources.init();
    HarvesterMemory.init();
    SpawnList.init();
    SpawnHaulerMemory.init();
    UpgraderMemory.init();
    BuilderMemory.init();
    if (!Memory.allies) {
      Memory.allies = [];
    }

    Sources.run();
    HarvesterMemory.run();
    SpawnList.run();
    Rooms.claims();
    Rooms.reserves();
    SpawnHaulerMemory.run();
    UpgraderMemory.run();
    BuilderMemory.run();
    HaulerMemory.run();
  }
}
