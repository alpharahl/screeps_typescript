export class Controller {
  public static vis() {
    for (let name in Game.rooms) {
      let room = Game.rooms[name];
      let controller = room.controller;
      if (!controller || !controller.owner || controller.owner.username != "alpha-rahl") {
        // not interested in this room, exit
        continue;
      } else {
        if (!room.memory.controllerHistory) {
          Controller.initMem(room);
          return;
        }
        room.memory.controllerHistory.push(controller.progress);
        if (room.memory.controllerHistory.length > 200) {
          room.memory.controllerHistory.shift();
        }
        var historyLength = room.memory.controllerHistory.length;
        var disp = Math.floor(
          (room.memory.controllerHistory[historyLength - 1] - room.memory.controllerHistory[0]) / historyLength
        );
        room.visual.text("AvgUpgrade:" + disp + "/" + historyLength, controller.pos.x, controller.pos.y - 2, {
          color: "yellow",
          font: 0.6
        });
      }
    }
  }

  public static initMem(room: Room) {
    if (!room.memory.controllerHistory) {
      room.memory.controllerHistory = [];
    }
  }
}
