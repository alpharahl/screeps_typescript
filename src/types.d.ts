// example declaration file - remove these and add your own custom typings

// memory extension samples
interface CreepMemory {
  type: string;
  room: string;
  roleMem: any;
  working: boolean;
  container?: string;
}

interface CreepSpawnObj {
  type: string;
  room: string;
  roleMem: any;
  name: string;
  body: Array<BodyPartConstant>;
}

interface Memory {
  harvesters: any;
  generic: any;
  sources: Array<string>;
  spawnList: Array<CreepSpawnObj>;
  rooms: Array<string>;
  claims: any;
  haulers: any;
  reserves: any;
  allies: Array<string>;
}

interface RoomMemory {
  spawnHaulers: Array<string>;
  upgraders: Array<string>;
  builders: Array<string>;
  roads: Array<RoomPosition>;
  controllerHistory: Array<number>;
  primaryStorage: string;
  lastSpawn: number;
  clearSites: boolean;
}

// `global` extension samples
declare namespace NodeJS {
  interface Global {
    log: any;
  }
}
