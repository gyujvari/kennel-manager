export interface Dog {
  id: number;
  name: string;
  chipNumber: string;
}

export interface Kennel {
  id: number;
  name: string;
  dogs: Dog[];
}

export interface KennelData {
  kennels: Kennel[];
  freeDogs: Dog[];
}
