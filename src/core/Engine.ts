import * as PIXI from 'pixi.js';
import { DEFAULT_CONFIG, IGameConfig } from '../config';
import { Loader } from './Loader';
import { BaseScene } from '../scenes/BaseScene';
import { RoundScene } from '../scenes/RoundScene';

export class Engine {
  private app: PIXI.Application;
  private loader: Loader;
  private currentScene: BaseScene | null = null;
  private config: IGameConfig;

  constructor(config: Partial<IGameConfig> = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };

    // Create PIXI application
    this.app = new PIXI.Application({
      width: this.config.width,
      height: this.config.height,
      backgroundColor: this.config.backgroundColor,
      antialias: this.config.antialias,
      autoDensity: this.config.autoDensity,
      resolution: this.config.resolution,
    });

    this.loader = new Loader();

    const gameContainer = document.getElementById('game-container');
    if (gameContainer) {
      gameContainer.appendChild(this.app.view);
    }

    window.addEventListener('resize', this.handleResize.bind(this));
  }

  /**
   * Start the game engine
   */
  public async start(): Promise<void> {
    await this.loader.loadInitialAssets();
    
    const baseScene = new BaseScene(this.app);
    this.setScene(baseScene);

    this.app.ticker.add(this.update.bind(this));
    
    console.log('Game engine started with Round scene');
  }

  /**
   * Set the current scene
   */
  public setScene(scene: BaseScene): void {
    if (this.currentScene) {
      this.app.stage.removeChild(this.currentScene.container);
      this.currentScene.destroy();
    }

    this.currentScene = scene;
    this.app.stage.addChild(this.currentScene.container);
    this.currentScene.init();
  }

  private update(deltaTime: number): void {
    if (this.currentScene) {
      this.currentScene.update(deltaTime);
    }
  }

  private handleResize(): void {
      const width = window.innerWidth;
      const height = window.innerHeight;
    
    this.app.renderer.resize(width, height);
    
    if (this.currentScene) {
      this.currentScene.onResize(width, height);
    }
  }

  public getApp(): PIXI.Application {
    return this.app;
  }

  public getLoader(): Loader {
    return this.loader;
  }
}