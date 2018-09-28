import { RoomUtils } from "utils/RoomUtils";
import { PositionUtils } from "utils/PositionUtils";

export class LinkMover {
  public static run(creep: Creep) {
    if (creep.pos.x == creep.memory.roleMem.x && creep.pos.y == creep.memory.roleMem.y) {
      var link = <StructureLink>PositionUtils.getNextTo(creep.pos, STRUCTURE_LINK)[0];
      var storage = <StructureStorage>PositionUtils.getNextTo(creep.pos, STRUCTURE_STORAGE)[0];
      creep.transfer(storage, RESOURCE_ENERGY);
      creep.withdraw(link, RESOURCE_ENERGY, creep.carryCapacity);
    } else {
      creep.moveTo(new RoomPosition(creep.memory.roleMem.x, creep.memory.roleMem.y, creep.room.name));
    }
  }

  public static spawn(room: Room) {
    if (room.memory.links) {
      var linkCreep = room.find(FIND_MY_CREEPS, {
        filter: (creep: Creep) => creep.memory.type == "LinkMover"
      });
      if (linkCreep.length == 0 && Object.keys(room.memory.links).length > 1) {
        return LinkMover.createCreep(room);
      }
    }
    return false;
  }

  public static createCreep(room: Room) {
    console.log("spawning a link mover in ", room.name);
    var spawn = RoomUtils.findBestSpawn(room);
    var body = [MOVE, CARRY, CARRY, CARRY];
    var link = <StructureLink>Game.getObjectById(room.memory.links.storage);
    var storage = room.storage!;
    var path = room.findPath(link.pos, storage.pos)[0];
    var posx = path.x;
    var posy = path.y;
    var creepMemory = {
      type: "LinkMover",
      room: room.name,
      roleMem: {
        link: link,
        storage: storage,
        x: posx,
        y: posy
      },
      working: false
    };
    var name = "LinkMover" + room.name;
    var result = spawn.spawnCreep(body, name, { memory: creepMemory });
    if (result == OK) {
      return true;
    } else {
      return false;
    }
  }
}
