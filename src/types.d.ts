// example declaration file - remove these and add your own custom typings

// memory extension samples
interface CreepMemory {
  type: string;
  room: string;
  roleMem: any;
  working: boolean;
}

interface CreepSpawnObj {
  type: string;
  room: string;
  roleMem: any;
}

interface Memory {
  harvesters: any;
  generic: any;
  sources: Array<string>;
  spawnList: Array<CreepSpawnObj>;
  rooms: Array<string>;
}

// `global` extension samples
declare namespace NodeJS {
  interface Global {
    log: any;
  }
}
