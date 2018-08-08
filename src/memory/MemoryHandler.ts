import { Sources } from "memory/Sources";
import { HarvesterMemory } from "memory/HarvesterMemory";
import { SpawnList } from "memory/SpawnList";
import { Rooms } from "memory/Rooms";
import { GenericMemory } from "memory/GenericMemory";

export class MemoryHandler {
  public static run() {
    Sources.init();
    Rooms.init();
    HarvesterMemory.init();
    SpawnList.init();
    GenericMemory.init();

    Sources.run();
    HarvesterMemory.run();
    SpawnList.run();
    Rooms.run();
    GenericMemory.run();
  }
}
