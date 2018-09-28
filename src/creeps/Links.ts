export class Links {
  public static run(room: Room) {
    if (!room.memory.links) {
      return;
    }
    var storage = <StructureLink>Game.getObjectById(room.memory.links.storage);
    for (var refId in room.memory.links) {
      var linkId = room.memory.links[refId];
      if (linkId != "storage") {
        var link = <StructureLink>Game.getObjectById(linkId);
        if (link.energy > 700) {
          link.transferEnergy(storage);
        }
      }
    }
  }
}
