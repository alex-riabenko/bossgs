import * as PIXI from 'pixi.js';
import { GameObject } from '../entities/GameObject';

export class BaseScene {
  protected app: PIXI.Application;
  public container: PIXI.Container;
  protected gameObjects: GameObject[] = [];

  constructor(app: PIXI.Application) {
    this.app = app;
    this.container = new PIXI.Container();
  }

  public init(): void {
    this.setupScene();
  }

  protected setupScene(): void {
    const graphics = new PIXI.Graphics();
    graphics.beginFill(0x000000);
    graphics.drawRect(-50, -50, 100, 100);
    graphics.endFill();
    
    const container = new PIXI.Container();
    container.addChild(graphics);
    container.position.set(this.app.screen.width / 2, this.app.screen.height / 2);
    
    this.container.addChild(container);
  }

  public addGameObject(gameObject: GameObject): void {
    this.gameObjects.push(gameObject);
    this.container.addChild(gameObject.getSprite());
    gameObject.init();
  }

  public removeGameObject(gameObject: GameObject): void {
    const index = this.gameObjects.indexOf(gameObject);
    if (index !== -1) {
      this.gameObjects.splice(index, 1);
      this.container.removeChild(gameObject.getSprite());
      gameObject.destroy();
    }
  }

  public update(deltaTime: number): void {
    this.gameObjects.forEach(obj => obj.update(deltaTime));
  }

  public onResize(width: number, height: number): void {
    // Override in derived classes
  }

  /**
   * Destroy scene
   */
  public destroy(): void {
    this.gameObjects.forEach(obj => obj.destroy());
    this.gameObjects = [];
    this.container.destroy({ children: true });
  }
}