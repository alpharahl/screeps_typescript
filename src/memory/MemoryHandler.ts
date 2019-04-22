import { CleanUp } from "./CleanUp";
import { Sources } from "./Sources";

export class MemoryHandler {
  public static run() {
    CleanUp.run();
    Sources.run();
  }
}
