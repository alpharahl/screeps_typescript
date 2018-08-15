import { CREEP_PRIORITY } from "constants";

export class CreepSpawner {
  public static run() {
    // Run for each room I can see
    for (var name in Game.rooms) {
      let room = Game.rooms[name];
      console.log("checking spawn for", room);
    }
  }
}
