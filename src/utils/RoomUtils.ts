export class RoomUtils {
  public static OwnedByMe(room: Room) {
    if (room.controller) {
      let controller = room.controller;
      if (controller.owner) {
        // Room is owned
        return controller.owner.username == "alpha-rahl";
      } else if (controller.reservation) {
        // Room is reserved
        return controller.reservation.username == "alpha-rahl";
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
}
