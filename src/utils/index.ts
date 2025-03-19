/**
 * Converts degrees to radians
 */
export function degToRad(degrees: number): number {
    return degrees * (Math.PI / 180);
  }
  
  /**
   * Converts radians to degrees
   */
  export function radToDeg(radians: number): number {
    return radians * (180 / Math.PI);
  }
  
  /**
   * Get random number between min and max (inclusive)
   */
  export function randomRange(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }
  
  /**
   * Get random integer between min and max (inclusive)
   */
  export function randomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  /**
   * Clamp value between min and max
   */
  export function clamp(value: number, min: number, max: number): number {
    return Math.max(min, Math.min(max, value));
  }
  
  /**
   * Linear interpolation between two values
   */
  export function lerp(a: number, b: number, t: number): number {
    return a + (b - a) * t;
  }