export class CreepUtils {
  public static getBodyCost(body: Array<BodyPartConstant>) {
    var cost = 0;
    body.forEach(part => {
      cost += BODYPART_COST[part];
    });
    return cost;
  }

  public static moveRoom(creep: Creep, roomName: string) {
    creep.moveTo(new RoomPosition(25, 25, roomName));
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
    }
  }

  public static setWorking(creep: Creep) {
    if (creep.carry.energy == creep.carryCapacity) {
      creep.memory.working = true;
    } else if (creep.carry.energy == 0) {
      creep.memory.working = false;
    }
  }

  public static fillSpawn(creep: Creep) {
    var spawns = creep.room.find(FIND_MY_SPAWNS);
    if (!spawns || spawns.length == 0) {
      return false;
    }
    for (var spawnId in spawns) {
      var spawn = spawns[spawnId];
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
