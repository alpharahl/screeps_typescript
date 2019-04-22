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
  spawns: Array<string>;
}

interface RoomMemory {
  spawnHaulers: string[];
  upgraders: string[];
  builders: string[];
  builderCount: number;
  roads: RoomPosition[];
  controllerHistory: number[];
  primaryStorage: string;
  lastSpawn: number;
  clearSites: boolean;
  sources: string[];
  harvesters: any;
  localHaulers: any;
  remoteHaulers: any;
  reserved: any;
  mine: string;
  miner: any;
  links: any;
  underAttack: boolean;
  defender: string;
  terminalHauler: string;
  spawnQueue: any;
}

// `global` extension samples
declare namespace NodeJS {
  interface Global {
    log: any;
  }
}
