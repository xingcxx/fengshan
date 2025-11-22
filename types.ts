export enum FanSpeed {
  OFF = 0,
  LOW = 1,
  MEDIUM = 2,
  HIGH = 3,
  TURBO = 4
}

export interface FanState {
  speed: FanSpeed;
  isOscillating: boolean;
}
