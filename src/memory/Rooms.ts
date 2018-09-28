import { Claimer } from "creeps/Claimer";
import { Reserver } from "creeps/Reserver";

export class Rooms {
  public static claims() {
    if (!Memory.claims) {
      Memory.claims = {};
    }

    for (var room in Memory.claims) {
      let claimStatus = Memory.claims[room];
    }
  }

  public static reserves() {}
}
