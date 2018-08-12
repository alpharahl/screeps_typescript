import { RoomUtils } from "utils/RoomUtils";

export class Storages {
  public static vis() {}

  public static getControllerStorage(room: Room) {
    let controller = room.controller!;
    let storage = controller.pos.findInRange(FIND_MY_STRUCTURES, 4, {
      filter: { structureType: STRUCTURE_STORAGE }
    });
    if (storage.length > 0) {
      return storage[0];
    } else {
      let containers = controller.pos.findInRange(FIND_STRUCTURES, 5, {
        filter: { structureType: STRUCTURE_CONTAINER }
      });
      if (containers.length > 0) {
        return containers[0];
      }
    }
    return null;
  }

  public static placeContainers() {
    for (let name in Game.rooms) {
      let room = Game.rooms[name];
      let controller = room.controller;
      if (!controller) {
        continue;
      } else {
        if (controller.owner && controller.owner.username == "alpha-rahl") {
          if (room.energyCapacityAvailable >= 550) {
            // extensions are completed for at least level 2
            Storages.build(room, 4, controller.pos, room.find(FIND_MY_SPAWNS)[0].pos);
            for (var source of room.find(FIND_SOURCES)) {
              Storages.build(room, 0, source.pos, controller.pos);
            }
          }
        } else if (controller.reservation && controller.reservation.username == "alpha-rahl") {
          for (var source of room.find(FIND_SOURCES)) {
            Storages.build(room, 0, source.pos, Game.spawns[Object.keys(Game.spawns)[0]].pos);
          }
        }
      }
    }
  }

  public static buildStorage() {
    for (let name in Game.rooms) {
      var room = Game.rooms[name];
      if (RoomUtils.OwnedByMe(room)) {
        var controller = room.controller;
        if (!controller) {
          continue;
        }
        if (controller.level >= 4 && !room.storage) {
          var spawn = room.find(FIND_MY_SPAWNS)[0];
          let pos = room.findPath(controller.pos, spawn.pos, { ignoreCreeps: true })[3];
          let position = new RoomPosition(pos.x, pos.y, room.name);
          position.createConstructionSite(STRUCTURE_STORAGE);
        }
      }
    }
  }

  private static build(room: Room, step: number, containerTarget: RoomPosition, direction: RoomPosition) {
    let firstStep = room.findPath(containerTarget, direction, { ignoreCreeps: true })[step];
    if (!firstStep) {
      console.log("Tried to build a container in room", room, "but failed");
      return;
    }
    new RoomPosition(firstStep.x, firstStep.y, room.name).createConstructionSite(STRUCTURE_CONTAINER);
  }
}
