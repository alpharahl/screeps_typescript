const spawnId =  Object.keys(Game.spawns)[0] as string;
const me = Game.spawns[spawnId].owner.username


export class RoomUtils {
  public static OwnedByMe(room: Room) {
    if (room.controller) {
      let controller = room.controller;
      if (controller.owner) {
        // Room is owned
        return controller.owner.username === me;
      } else if (controller.reservation) {
        // Room is reserved
        return controller.reservation.username === me;
      }
    }
    return false;
  }

  public static reservedByMe(room: Room) {
    if (room.controller && room.controller.reservation) {
      if (room.controller.reservation.username === me) {
        return true;
      }
    }
    return false;
  }

  public static ClearSites() {
    for (var name in Game.rooms) {
      var room = Game.rooms[name];
      if (room.memory.clearSites) {
        var sites = room.find(FIND_CONSTRUCTION_SITES);
        for (var site of sites) {
          site.remove();
        }
        room.memory.clearSites = false;
      }
    }
  }

  public static findBestSpawn(room: Room) {
    var spawn = Game.spawns[Object.keys(Game.spawns)[0]];
    if (room.find(FIND_MY_SPAWNS).length > 0) {
      spawn = room.find(FIND_MY_SPAWNS)[0];
    } else {
      for (var name in Game.rooms) {
        var potentialRoom = Game.rooms[name];

        if (potentialRoom.memory.reserved && potentialRoom.memory.reserved[room.name]) {
          spawn = potentialRoom.find(FIND_MY_SPAWNS)[0];
        }
      }
    }
    return spawn;
  }

  public static defenseCheck() {
    for (var name in Game.rooms) {
      var room = Game.rooms[name];
      if (this.reservedByMe(room)) {
        var invaders = <Array<any>>room.find(FIND_HOSTILE_CREEPS, {
          filter: creep => creep.owner.username == "Invader"
        });
        if (invaders.length > 0) {
          room.memory.underAttack = true;
        } else {
          room.memory.underAttack = false;
        }
      }
    }
  }
}
