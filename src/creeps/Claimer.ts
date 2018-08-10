export class Claimer {
  public static spawn(room: string) {
    let spawn = Game.spawns[0];
    return spawn.spawnCreep([MOVE, MOVE, CLAIM], "Claimer-" + room + "-" + Game.time, {
      memory: {
        room: room,
        type: "Claimer",
        roleMem: {},
        working: false
      }
    });
  }
}
