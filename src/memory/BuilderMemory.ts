import { Builder } from "creeps/Builder";

export class BuilderMemory {
  public static init() {
    for (let n in Game.rooms) {
      let room = Game.rooms[n];
      if (room.find(FIND_CONSTRUCTION_SITES).length > 0) {
        if (room.memory.builders == null) {
          console.log("Resetting builders for", room.name);
          room.memory.builders = [];
        }
      }
    }
  }

  public static run() {
    for (let n in Game.rooms) {
      var room = Game.rooms[n];
      if (room.memory.builders) {
        for (let creepName of room.memory.builders) {
          if (creepName != "spawning") {
            let creep = Game.creeps[creepName];
            if (!creep) {
              var index = room.memory.builders.indexOf(creepName);
              room.memory.builders.splice(index, 1);
            }
          }
        }
        var numBuilders =
          room.find(FIND_CONSTRUCTION_SITES, {
            filter: i =>
              i.structureType != STRUCTURE_ROAD &&
              i.structureType != STRUCTURE_WALL &&
              i.structureType != STRUCTURE_RAMPART
          }).length / 2;
        var roadBuilders = room.find(FIND_CONSTRUCTION_SITES, {
          filter: i =>
            i.structureType == STRUCTURE_ROAD ||
            i.structureType == STRUCTURE_WALL ||
            i.structureType == STRUCTURE_RAMPART
        }).length;
        if (roadBuilders > 0) {
          roadBuilders = 1;
        }
        numBuilders = Math.max(numBuilders, roadBuilders);

        if (room.memory.builders.length < numBuilders) {
          Builder.spawn(room.name);
          room.memory.builders.push("spawning");
        }
      }
    }
  }
}
