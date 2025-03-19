import * as PIXI from 'pixi.js';

export abstract class GameObject {
  protected sprite: PIXI.Sprite | PIXI.Container;
  
  constructor(sprite: PIXI.Sprite | PIXI.Container) {
    this.sprite = sprite;
  }

  /**
   * Initialize game object
   */
  public abstract init(): void;

  /**
   * Update game object
   */
  public abstract update(deltaTime: number): void;

  /**
   * Get sprite/container
   */
  public getSprite(): PIXI.Sprite | PIXI.Container {
    return this.sprite;
  }

  /**
   * Destroy game object
   */
  public destroy(): void {
    this.sprite.destroy();
  }
}