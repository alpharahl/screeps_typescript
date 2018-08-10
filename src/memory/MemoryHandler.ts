import { Sources } from "./Sources";
import { HarvesterMemory } from "./HarvesterMemory";
import { SpawnList } from "./SpawnList";
import { Rooms } from "./Rooms";
import { SpawnHaulerMemory } from "./SpawnHaulerMemory";
import { UpgraderMemory } from "./UpgraderMemory";
import { BuilderMemory } from "./BuilderMemory";

export class MemoryHandler {
  public static run() {
    Sources.init();
    HarvesterMemory.init();
    SpawnList.init();
    SpawnHaulerMemory.init();
    UpgraderMemory.init();
    BuilderMemory.init();

    Sources.run();
    HarvesterMemory.run();
    SpawnList.run();
    Rooms.claims();
    SpawnHaulerMemory.run();
    UpgraderMemory.run();
    BuilderMemory.run();
  }
}
