// types.ts vagy ahol a típusok vannak

export interface Dog {
  id: string;
  name: string;
  chipNumber: string;
}

export interface Kennel {
  id: string;
  name: string;
  dogs: Dog[];
}

export interface KennelData {
  kennels: Kennel[];
  freeDogs: Dog[];
}
