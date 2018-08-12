export class Sources {
  public static init() {
    if (!Memory.sources) {
      Memory.sources = [];
    }
  }

  public static run() {
    for (var name in Game.rooms) {
      var room = Game.rooms[name];
      var controller = room.controller;
      if (!controller) {
        return;
      }
      if (controller.owner && controller.owner.username == "alpha-rahl") {
        var sources = room.find(FIND_SOURCES);
        for (let source of sources) {
          if (!Memory.sources.includes(source.id)) {
            Memory.sources.push(source.id);
          }
        }
      } else if (controller.reservation && controller.reservation.username == "alpha-rahl") {
        var sources = room.find(FIND_SOURCES);
        for (let source of sources) {
          if (!Memory.sources.includes(source.id)) {
            Memory.sources.push(source.id);
          }
        }
      }
    }
  }
}
