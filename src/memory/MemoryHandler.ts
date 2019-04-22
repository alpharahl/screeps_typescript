import { Sources } from "./Sources";
import { Rooms } from "./Rooms";
import { SpawnHaulerMemory } from "./SpawnHaulerMemory";
import { UpgraderMemory } from "./UpgraderMemory";
import { BuilderMemory } from "./BuilderMemory";
import { LocalHaulerMemory } from "./LocalHaulerMemory";
import { Reserve } from "./Reserve";
import { CleanUp } from "./CleanUp";
import { MinerMemory } from "./MinerMemory";

export class MemoryHandler {
  public static run() {
    CleanUp.run();
    Sources.run();
    // SpawnHaulerMemory.init();
    // UpgraderMemory.init();
    // BuilderMemory.init();
    // if (!Memory.allies) {
    //   Memory.allies = [];
    // }
    //
    // MinerMemory.run();
    // Rooms.claims();
    // Rooms.reserves();
    // SpawnHaulerMemory.run();
    // UpgraderMemory.run();
    // BuilderMemory.run();
    // LocalHaulerMemory.run();
    // Reserve.run();
  }
}
