import { ErrorMapper } from "utils/ErrorMapper";
import { CreepHandler } from "creeps/CreepHandler";
import { BuildingHandler } from "structures/BuildingHandler";
import { MemoryHandler } from "memory/MemoryHandler";

// When compiling TS to JS and bundling with rollup, the line numbers and file names in error messages change
// This utility uses source maps to get the line numbers and file names of the original, TS source code
export const loop = ErrorMapper.wrapLoop(() => {
  console.log(`Current game tick is ${Game.time}`);
  try {
    MemoryHandler.run();
  } catch (e) {
    console.log("Memory failed with:", e.stack);
  }

  try {
    BuildingHandler.run();
  } catch (e) {
    console.log("Building failed with:", e.stack);
  }

  try {
    CreepHandler.run();
  } catch (e) {
    console.log("Creep failed with:", e.stack);
  }
  // Automatically delete memory of missing creeps
  for (const name in Memory.creeps) {
    if (!(name in Game.creeps)) {
      delete Memory.creeps[name];
    }
  }
});
