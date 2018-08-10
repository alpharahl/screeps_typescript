import { Claimer } from "creeps/Claimer";

export class Rooms {
  public static claims() {
    if (!Memory.claims) {
      Memory.claims = {};
    }

    for (var room in Memory.claims) {
      let claimStatus = Memory.claims[room];
      switch (Memory.claims[room]) {
        case true:
          if (Claimer.spawn(room) == OK) {
            Memory.claims[room] = "spawning";
          }
          break;
        case "spawning":
      }
    }
  }
}
