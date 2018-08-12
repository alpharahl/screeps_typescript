import { Claimer } from "creeps/Claimer";
import { Reserver } from "creeps/Reserver";

export class Rooms {
  public static claims() {
    if (!Memory.claims) {
      Memory.claims = {};
    }

    for (var room in Memory.claims) {
      let claimStatus = Memory.claims[room];
      switch (Memory.claims[room]) {
        case true:
          Claimer.spawn(room);
          Memory.claims[room] = "spawning";
          break;
      }
    }
  }

  public static reserves() {
    if (!Memory.reserves) {
      Memory.reserves = {};
    }

    for (var room in Memory.reserves) {
      let reserveStatus = Memory.reserves[room];
      if (!reserveStatus || reserveStatus == "replace") {
        Reserver.spawn(room);
        Memory.reserves[room] = "spawning";
      } else if (reserveStatus != "spawning") {
        let creep = Game.creeps[Memory.reserves[room]];
        if (!creep) {
          Reserver.spawn(room);
          Memory.reserves[room] = "spawning";
        }
      }
    }
  }
}
