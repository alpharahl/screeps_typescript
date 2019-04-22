import { CleanUp } from "./CleanUp";
import { Sources } from "./Sources";
import { SpawnQueue } from "./SpawnQueue";

export class MemoryHandler {
  public static run() {
    CleanUp.run();
    Sources.run();
    SpawnQueue.run();
  }
}
