import * as PIXI from 'pixi.js';

export class Loader {
  private loader: PIXI.Loader;

  constructor() {
    this.loader = PIXI.Loader.shared;
    
    // Add loader events
    this.loader.onProgress.add(this.handleProgress.bind(this));
    this.loader.onError.add(this.handleError.bind(this));
  }

  /**
   * Load initial game assets
   */
  public async loadInitialAssets(): Promise<void> {
    return new Promise((resolve) => {
      // Add your initial assets here
      // this.loader.add('sprite', 'assets/sprite.png');
      
      // Start loading and resolve when complete
      this.loader.load(() => {
        console.log('Initial assets loaded');
        resolve();
      });
    });
  }

  /**
   * Load additional assets
   */
  public async loadAssets(assets: { name: string; url: string }[]): Promise<void> {
    return new Promise((resolve) => {
      // Add assets to loader
      assets.forEach(asset => {
        this.loader.add(asset.name, asset.url);
      });
      
      // Start loading and resolve when complete
      this.loader.load(() => {
        console.log('Additional assets loaded');
        resolve();
      });
    });
  }

  /**
   * Handle loader progress
   */
  private handleProgress(loader: PIXI.Loader): void {
    console.log(`Loading: ${loader.progress.toFixed(2)}%`);
  }

  /**
   * Handle loader error
   */
  private handleError(error: Error, loader: PIXI.Loader): void {
    console.error('Loader error:', error);
  }

  /**
   * Get resource by name
   */
  public getResource(name: string): PIXI.LoaderResource | undefined {
    return this.loader.resources[name];
  }
}