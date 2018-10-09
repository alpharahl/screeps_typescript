import { Storages } from "structures/Storage";

export class CreepUtils {
  public static getBodyCost(body: Array<BodyPartConstant>) {
    var cost = 0;
    body.forEach(part => {
      cost += BODYPART_COST[part];
    });
    return cost;
  }

  public static moveRoom(creep: Creep, roomName: string = "") {
    if (roomName == "") {
      roomName = creep.memory.room;
    }
    if (creep.memory.room != creep.room.name) {
      creep.moveTo(new RoomPosition(25, 25, roomName));
      return true;
    }
    return false;
  }

  public static pickup(creep: Creep) {
    var pickups = creep.room.find(FIND_DROPPED_RESOURCES, {
      filter: i => i.amount >= 50
    });
    var target = creep.pos.findClosestByPath(pickups);
    if (target) {
      if (creep.pickup(target) == ERR_NOT_IN_RANGE) {
        creep.moveTo(target);
      }
      return;
    }
    var tombstones = creep.room.find(FIND_TOMBSTONES, {
      filter: i => i.store[RESOURCE_ENERGY] > 0
    });
    if (tombstones.length > 0) {
      var targetTombstone = <Tombstone>creep.pos.findClosestByPath(tombstones);
      if (creep.withdraw(targetTombstone, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        creep.moveTo(targetTombstone);
      }
      return;
    }
    var miningContainers = <Array<StructureContainer>>[];

    for (var n in creep.room.find(FIND_SOURCES)) {
      var source = creep.room.find(FIND_SOURCES)[n];
      var containers = <Array<StructureContainer>>(
        source.pos.findInRange(FIND_STRUCTURES, 1, { filter: { structureType: STRUCTURE_CONTAINER } })
      );
      if (containers.length > 0) {
        for (var c of containers) {
          if (c.store[RESOURCE_ENERGY] > 50) {
            miningContainers.push(c);
          }
        }
      }
    }
    var targetContainer = <StructureContainer>creep.pos.findClosestByPath(miningContainers);

    if (creep.withdraw(targetContainer, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
      creep.moveTo(targetContainer);
    }
  }

  public static withdraw(creep: Creep, resource: ResourceConstant = RESOURCE_ENERGY) {
    var structures = creep.room.find(FIND_STRUCTURES, {
      filter: (i: any) =>
        (i.structureType == STRUCTURE_CONTAINER || i.structureType == STRUCTURE_STORAGE) && i.store[resource] >= 1000
    });
    if (structures.length == 0) {
      structures = creep.room.find(FIND_MY_STRUCTURES, {
        filter: s => s.structureType == STRUCTURE_LINK && s.energy > 0
      });
    }
    if (structures.length > 0) {
      var target = <any>creep.pos.findClosestByPath(structures);
      if (creep.withdraw(target, resource) == ERR_NOT_IN_RANGE) {
        creep.moveTo(target);
      } else if (target) {
        creep.memory.roleMem.storage = target.id;
      }
    } else {
      CreepUtils.pickup(creep);
    }
  }

  public static deposit(creep: Creep, resource: ResourceConstant = RESOURCE_ENERGY) {
    var structures = creep.room.find(FIND_STRUCTURES, {
      filter: i => i.structureType == STRUCTURE_LINK || i.structureType == STRUCTURE_STORAGE
    })!;
    if (structures.length == 0) {
      structures = creep.room.find(FIND_STRUCTURES, {
        filter: i => i.structureType == STRUCTURE_CONTAINER
      });
    }
    if (structures.length > 0) {
      var target = <any>creep.pos.findClosestByPath(structures);
      if (creep.transfer(target, resource) == ERR_NOT_IN_RANGE) {
        creep.moveTo(target);
      }
    }
  }

  public static findHostileCreeps(room: Room) {
    return room.find(FIND_HOSTILE_CREEPS, {
      filter: creep => Memory.allies.indexOf(creep.owner.username) == -1
    });
  }

  public static findHostileStructures(room: Room) {
    return room.find(FIND_HOSTILE_STRUCTURES, {
      filter: struct => Memory.allies.indexOf(struct.owner.username) == -1
    });
  }

  public static findHostileSpawns(room: Room) {
    return room.find(FIND_HOSTILE_SPAWNS, {
      filter: struct => Memory.allies.indexOf(struct.owner.username) == -1
    });
  }

  public static setWorking(creep: Creep) {
    if (_.sum(creep.carry) == creep.carryCapacity) {
      creep.memory.working = true;
    } else if (_.sum(creep.carry) == 0) {
      creep.memory.working = false;
    }
  }

  public static fillSpawn(creep: Creep) {
    var spawns = creep.room.find(FIND_MY_STRUCTURES, {
      filter: i =>
        (i.structureType == STRUCTURE_EXTENSION || i.structureType == STRUCTURE_SPAWN) && i.energy < i.energyCapacity
    });
    if (!spawns || spawns.length == 0) {
      var tower = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
        filter: struct => struct.structureType == STRUCTURE_TOWER && struct.energy < 700
      });
      if (tower) {
        if (creep.transfer(tower, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
          creep.moveTo(tower);
        }
        return true;
      } else {
        var terminal = creep.room.terminal;
        if (terminal) {
          if (terminal.store[RESOURCE_ENERGY] < 50000) {
            if (creep.transfer(terminal, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
              creep.moveTo(terminal);
            }
            return true;
          }
        }
      }
      return true;
    }

    for (var spawnId in spawns) {
      var spawn = <StructureExtension>spawns[spawnId];
      if (spawn.energy < spawn.energyCapacity) {
        if (creep.transfer(spawn, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
          creep.moveTo(spawn);
        }
        return true;
      }
    }

    return false;
  }
  public static upgrade(creep: Creep) {
    let controller = creep.room.controller;
    if (!controller) {
      return false;
    }
    if (creep.upgradeController(controller) == ERR_NOT_IN_RANGE) {
      creep.moveTo(controller);
    }
    return true;
  }
}
