export interface IGameConfig {
  width: number;
  height: number;
  backgroundColor: number;
  autoDensity: boolean;
  antialias: boolean;
  resolution: number;
}

export const DEFAULT_CONFIG: IGameConfig = {
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: 0x1099bb,
  autoDensity: true,
  antialias: true,
  resolution: window.devicePixelRatio || 1,
};
