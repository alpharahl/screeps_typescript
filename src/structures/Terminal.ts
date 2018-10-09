export class Terminal {
  public static run() {
    for (var name in Game.rooms) {
      var room = Game.rooms[name];
      if (room.terminal) {
        let terminal = room.terminal;
        this.needWorker(terminal, room);
        this.marketWork(terminal);
      }
    }
  }

  public static needWorker(terminal: StructureTerminal, room: Room) {
    var storage = room.storage;
    if (storage) {
      // Does room have an extractor
      var extractors = room.find(FIND_MY_STRUCTURES, {
        filter: struct => struct.structureType == STRUCTURE_EXTRACTOR
      });
      if (extractors.length > 0) {
        var mineral = room.find(FIND_MINERALS)[0];
        if (storage.store[mineral.mineralType] && storage.store[mineral.mineralType]! > 10000) {
          if (room.memory.terminalHauler == null || room.memory.terminalHauler == "") {
            room.memory.terminalHauler = "true";
          } else {
          }
        }
      }
    }
  }

  public static resourceType(terminal: StructureTerminal, room: Room) {
    return room.find(FIND_MINERALS)[0].mineralType!;
  }

  public static marketWork(terminal: StructureTerminal) {
    let resourceType = this.resourceType(terminal, terminal.room);
    if (terminal.store[resourceType] && terminal.store[resourceType]! < 1000) {
      return;
    }
    var offers = Game.market.getAllOrders(
      order =>
        order.resourceType == resourceType &&
        order.type == ORDER_BUY &&
        (Game.market.calcTransactionCost(order.remainingAmount, terminal.room.name, order.roomName!) < 10000 ||
          Game.market.calcTransactionCost(terminal.store[resourceType]!, terminal.room.name, order.roomName!) < 10000)
    );
    if (offers.length > 0) {
      let order = offers[0];
      for (var offer of offers) {
        if (offer.price > order.price) {
          order = offer;
        }
      }
      let amount = order.remainingAmount;
      if (amount > terminal.store[resourceType]!) {
        amount = terminal.store[resourceType]!;
      }
      Game.market.deal(order.id, amount, terminal.room.name);
    }
  }
}
