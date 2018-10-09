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
  spawnHaulers: Array<string>;
  upgraders: Array<string>;
  builders: Array<string>;
  builderCount: number;
  roads: Array<RoomPosition>;
  controllerHistory: Array<number>;
  primaryStorage: string;
  lastSpawn: number;
  clearSites: boolean;
  sources: Array<string>;
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
}

// `global` extension samples
declare namespace NodeJS {
  interface Global {
    log: any;
  }
}
