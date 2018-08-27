import { Sources } from "./Sources";
import { HarvesterMemory } from "./HarvesterMemory";
import { SpawnList } from "./SpawnList";
import { Rooms } from "./Rooms";
import { SpawnHaulerMemory } from "./SpawnHaulerMemory";
import { UpgraderMemory } from "./UpgraderMemory";
import { BuilderMemory } from "./BuilderMemory";
import { LocalHaulerMemory } from "./LocalHaulerMemory";
import { Reserve } from "./Reserve";
import { CleanUp } from "./CleanUp";

export class MemoryHandler {
  public static run() {
    Sources.run();
    HarvesterMemory.init();
    SpawnList.init();
    SpawnHaulerMemory.init();
    UpgraderMemory.init();
    BuilderMemory.init();
    CleanUp.run();
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
    Reserve.run();
  }
}
