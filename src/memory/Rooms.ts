export class Rooms {
  public static run() {
    for (let name in Game.rooms) {
      var room = Game.rooms[name];
      if (!room.controller) {
        return;
      }
      if (room.controller.owner.username == "alpha-rahl") {
        if (!Memory.rooms.includes(name)) {
          Memory.rooms.push(name);
        }
      }
    }
  }

  public static init() {
    if (!Memory.rooms) {
      Memory.rooms = [];
    }
  }
}
