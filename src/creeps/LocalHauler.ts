import { RoomUtils } from "utils/RoomUtils";
import { CreepUtils } from "utils/CreepUtils";

export class LocalHauler {
  public static run(creep: Creep) {
    if (!creep.ticksToLive) {
      var room = creep.room;
      if (room.memory.localHaulers.indexOf(creep.name) == -1) {
        var indSpawning = room.memory.localHaulers.indexOf("spawning");
        room.memory.localHaulers.splice(indSpawning, 1);
        room.memory.localHaulers.push(creep.name);
      }
    }

    CreepUtils.setWorking(creep);
    if (creep.memory.working) {
      var storage = creep.room.storage;
      if (!storage) {
        let containers = creep.room.controller!.pos.findInRange(FIND_STRUCTURES, 6, {
          filter: { structureType: STRUCTURE_CONTAINER }
        });
        LocalHauler.transfer(creep, containers[0]);
      }
      if (storage) {
        LocalHauler.transfer(creep, storage);
      }
    } else {
      if (creep.memory.roleMem.pickup) {
        var pickup = <any>Game.getObjectById(creep.memory.roleMem.pickup);
        if (!pickup) {
          creep.memory.roleMem.pickup = null;
          return;
        }
        if (creep.pickup(pickup) == ERR_NOT_IN_RANGE) {
          creep.moveTo(pickup);
        }
      } else {
        var pickups = [];
        var containers = <Array<StructureContainer>>[];
        for (var source of creep.room.find(FIND_SOURCES)) {
          let container = <Array<StructureContainer>>source.pos.findInRange(FIND_STRUCTURES, 1, {
            filter: { structureType: STRUCTURE_CONTAINER }
          });
          if (container.length > 0) {
            containers.push(container[0]);
          }
          let dropped = source.pos.findInRange(FIND_DROPPED_RESOURCES, 1, {
            filter: { resourceType: RESOURCE_ENERGY }
          });
          if (dropped.length > 0) {
            pickups.push(dropped[0]);
          }
        }
        pickups = pickups.sort(
          (leftSide, rightSide): number => {
            if (leftSide.amount < rightSide.amount) return 1;
            if (leftSide.amount > rightSide.amount) return -1;
            return 0;
          }
        );
        containers = containers.sort(
          (leftSide, rightSide): number => {
            if (leftSide.store[RESOURCE_ENERGY] < rightSide.store[RESOURCE_ENERGY]) return 1;
            if (leftSide.store[RESOURCE_ENERGY] > rightSide.store[RESOURCE_ENERGY]) return -1;
            return 0;
          }
        );
        if (pickups.length > 0) {
          creep.memory.roleMem.pickup = pickups[0].id;
        } else if (containers.length > 0) {
          creep.memory.roleMem.pickup = containers[0].id;
        }
      }
    }
  }

  public static transfer(creep: Creep, store: any, resource: ResourceConstant = RESOURCE_ENERGY) {
    if (creep.transfer(store, resource) == ERR_NOT_IN_RANGE) {
      creep.moveTo(store);
    }
  }

  public static spawn(room: Room) {
    if (room.memory.localHaulers.length < 2) {
      var container = room.controller!.pos.findInRange(FIND_STRUCTURES, 6, {
        filter: { structureType: STRUCTURE_CONTAINER }
      });
      var storage = room.controller!.pos.findInRange(FIND_MY_STRUCTURES, 5, {
        filter: { structureType: STRUCTURE_STORAGE }
      });

      if (storage.length > 0 || container.length > 0) {
        return LocalHauler.createCreep(room);
      } else {
        return false;
      }
    }
    return false;
  }

  public static getBody(spawnRoom: Room) {
    var maxCarry = 1500;
    var energyAvailable = spawnRoom.energyAvailable;
    var numCarries = Math.floor(energyAvailable / 100);
    numCarries = Math.min(numCarries, maxCarry / 50);
    var moves = <Array<BodyPartConstant>>[];
    var carries = <Array<BodyPartConstant>>[];
    for (var i = 0; i < numCarries; i++) {
      moves = moves.concat([MOVE]);
      carries = carries.concat([CARRY]);
    }
    var body = moves.concat(carries);
    return body;
  }

  public static createCreep(room: Room) {
    console.log("Attempting to spawn a local hauler for", room);
    var spawn = RoomUtils.findBestSpawn(room);
    if (spawn.spawning || spawn.room.energyAvailable < 300) {
      return false;
    }
    var body = LocalHauler.getBody(spawn.room);
    var creepMemory = {
      type: "LocalHauler",
      room: room.name,
      roleMem: {},
      working: false
    };
    var name = "LocalHauler" + "-" + spawn.name + "-" + Game.time;
    var result = spawn.spawnCreep(body, name, {
      memory: creepMemory
    });

    if (result == OK) {
      room.memory.localHaulers.push("spawning");
      return true;
    } else {
      console.log("Failed to spawn local hauler with error", result);
    }

    return false;
  }
}
