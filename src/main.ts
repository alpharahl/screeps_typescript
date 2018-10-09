import { ErrorMapper } from "utils/ErrorMapper";
import { CreepHandler } from "creeps/CreepHandler";
import { BuildingHandler } from "structures/BuildingHandler";
import { MemoryHandler } from "memory/MemoryHandler";

interface DebugStore {
  usedCPU: number;
  priorCPU: number;
}

let debugStore: DebugStore;

function InitializeDebugStore(): void {
  debugStore = {
    usedCPU: 0,
    priorCPU: 0
  };
}

function LogCPU(prefix: string): void {
  debugStore.usedCPU = Math.round(Game.cpu.getUsed() * 10) / 10;
  let sinceLast: number = Math.round((debugStore.usedCPU - debugStore.priorCPU) * 10) / 10;
  console.log(prefix + "-CPU: " + sinceLast + " (" + debugStore.usedCPU + ")");
  debugStore.priorCPU = debugStore.usedCPU;
}
// When compiling TS to JS and bundling with rollup, the line numbers and file names in error messages change
// This utility uses source maps to get the line numbers and file names of the original, TS source code
export const loop = ErrorMapper.wrapLoop(() => {
  console.log(`Current game tick is ${Game.time}`);
  InitializeDebugStore();
  MemoryHandler.run();
  LogCPU("Memory Run");

  BuildingHandler.run();
  LogCPU("Buildings Handled");

  CreepHandler.run();
  LogCPU("Creeps Handled");
  // Automatically delete memory of missing creeps
  for (const name in Memory.creeps) {
    if (!(name in Game.creeps)) {
      delete Memory.creeps[name];
    }
  }
});
