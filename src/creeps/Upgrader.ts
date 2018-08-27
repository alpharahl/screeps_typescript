import { CreepUtils } from "utils/CreepUtils";
import { RoomUtils } from "utils/RoomUtils";

export class Upgrader {
  public static run(creep: Creep) {
    if (!creep.ticksToLive) {
      var room = creep.room;
      if (room.memory.upgraders.indexOf(creep.name) == -1) {
        var indSpawning = room.memory.upgraders.indexOf("spawning");
        room.memory.upgraders.splice(indSpawning, 1);
        room.memory.upgraders.push(creep.name);
      }
    }
    CreepUtils.setWorking(creep);
    if (creep.memory.working) {
      if (creep.memory.roleMem.storage) {
        var storage = <Structure>Game.getObjectById(creep.memory.roleMem.storage);
        if (storage) {
          creep.withdraw(storage, RESOURCE_ENERGY, 15);
        }
      }
      CreepUtils.upgrade(creep);
    } else {
      CreepUtils.withdraw(creep);
    }
  }

  public static spawn(room: Room) {
    if (room.memory.upgraders.length < 2 && room.controller && room.controller.owner && room.controller.owner.username == 'alpha-rahl') {
      return Upgrader.createCreep(room);
    }
    return false;
  }

  public static getBody(spawnRoom: Room) {
    var energyAvailable = spawnRoom.energyAvailable;
    var body = <Array<BodyPartConstant>>[MOVE, MOVE, CARRY];
    var maxWorks = 15;
    var numWorks = Math.floor((energyAvailable - CreepUtils.getBodyCost(body)) / 100);
    var loops = Math.min(maxWorks, numWorks);
    for (var i = 0; i < loops; i++) {
      body = body.concat([WORK]);
    }
    return body;
  }

  public static createCreep(room: Room) {
    console.log("Attempting to spawn an upgrader for", room);
    var spawn = RoomUtils.findBestSpawn(room);
    if (spawn.spawning || spawn.room.energyAvailable < 300) {
      return false;
    }
    var body = Upgrader.getBody(spawn.room);
    var creepMemory = {
      type: "Upgrader",
      room: room.name,
      roleMem: {},
      working: false
    };
    var name = "Upgrader" + "-" + spawn.name + "-" + Game.time;
    var result = spawn.spawnCreep(body, name, {
      memory: creepMemory
    });

    if (result == OK) {
      room.memory.upgraders.push("spawning");
      return true;
    } else {
      console.log("Failed to spawn Upgrader with error", result);
    }

    return false;
  }
}
