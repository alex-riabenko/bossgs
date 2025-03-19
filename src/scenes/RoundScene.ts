import * as PIXI from 'pixi.js';
import { BaseScene } from './BaseScene';

export class RoundScene extends BaseScene {
  private circle!: PIXI.Graphics;
  private orbiters: PIXI.Sprite[] = [];
  private orbiterSpeed: number = 0.01;
  private orbiterDistance: number = 150;
  private numOrbiters: number = 8;
  private centerText!: PIXI.Text;

  constructor(app: PIXI.Application) {
    super(app);
  }

  protected setupScene(): void {
    this.circle = new PIXI.Graphics();
    this.circle.beginFill(0x9966FF);
    this.circle.drawCircle(0, 0, 50);
    this.circle.endFill();
    this.circle.position.set(this.app.screen.width / 2, this.app.screen.height / 2);
    this.container.addChild(this.circle);

    this.app.ticker.add(() => {
      const pulseScale = 1 + Math.sin(this.app.ticker.lastTime * 0.002) * 0.1;
      this.circle.scale.set(pulseScale);
    });

    const style = new PIXI.TextStyle({
      fontFamily: 'Arial',
      fontSize: 18,
      fontWeight: 'bold',
      fill: '#ffffff',
    });
    this.centerText = new PIXI.Text('Round', style);
    this.centerText.anchor.set(0.5);
    this.centerText.position.set(this.app.screen.width / 2, this.app.screen.height / 2);
    this.container.addChild(this.centerText);

    this.createOrbiters();

    this.circle.interactive = true;
    this.circle.buttonMode = true;
    this.circle.on('pointerdown', this.onCircleClick.bind(this));

    this.createBackground();
  }

  private createOrbiters(): void {
    for (let i = 0; i < this.numOrbiters; i++) {
      const graphics = new PIXI.Graphics();
      const color = 0xFFFFFF * Math.random();
      graphics.beginFill(color);
      graphics.drawRect(-15, -15, 30, 30);
      graphics.endFill();
      
      const texture = this.app.renderer.generateTexture(graphics);
      const orbiter = new PIXI.Sprite(texture);

      const angle = (i / this.numOrbiters) * Math.PI * 2;
      orbiter.position.x = Math.cos(angle) * this.orbiterDistance;
      orbiter.position.y = Math.sin(angle) * this.orbiterDistance;

      orbiter.anchor.set(0.5);

      orbiter.angle = angle;

      orbiter.interactive = true;
      orbiter.buttonMode = true;
      
      orbiter.on('pointerdown', () => {
        const newColor = 0xFFFFFF * Math.random();
        const colorMatrix = new PIXI.filters.ColorMatrixFilter();
        colorMatrix.tint(newColor);
        orbiter.filters = [colorMatrix];
      });

      const container = new PIXI.Container();
      container.addChild(orbiter);
      container.position.set(this.app.screen.width / 2, this.app.screen.height / 2);
      
      this.container.addChild(container);
      this.orbiters.push(orbiter);
    }
  }

  private createBackground(): void {
    const background = new PIXI.Graphics();

    for (let i = 0; i < 10; i++) {
      const ratio = i / 10;
      const color = i % 2 === 0 ? 0x333399 : 0x3333cc;
      const alpha = 1 - ratio * 0.7;
      background.beginFill(color, alpha);
      background.drawCircle(0, 0, 300 * (1 - ratio));
      background.endFill();
    }
    
    background.position.set(this.app.screen.width / 2, this.app.screen.height / 2);
    background.blendMode = PIXI.BLEND_MODES.SCREEN;

    this.container.addChildAt(background, 0);
  }

  private onCircleClick(): void {
    this.orbiterSpeed *= -1;

    this.circle.clear();
    this.circle.beginFill(Math.random() * 0xFFFFFF);
    this.circle.drawCircle(0, 0, 50);
    this.circle.endFill();

    this.centerText.text = this.orbiterSpeed > 0 ? 'Clockwise' : 'Counter';
  }

  public update(deltaTime: number): void {
    super.update(deltaTime);

    this.orbiters.forEach((orbiter, index) => {
      orbiter.angle += this.orbiterSpeed * deltaTime;

      const x = Math.cos(orbiter.angle) * this.orbiterDistance;
      const y = Math.sin(orbiter.angle) * this.orbiterDistance;

      orbiter.position.set(x, y);

      orbiter.rotation += 0.01 * deltaTime;
    });
  }

  public onResize(width: number, height: number): void {
    this.circle.position.set(width / 2, height / 2);
    this.centerText.position.set(width / 2, height / 2);

    for (let i = 0; i < this.container.children.length; i++) {
      const child = this.container.children[i];
      if (child instanceof PIXI.Container && child.children.length > 0) {
        if (child.children[0] === this.orbiters[0]) {
          child.position.set(width / 2, height / 2);
        }
      }
    }

    if (this.container.children[0] instanceof PIXI.Graphics) {
      this.container.children[0].position.set(width / 2, height / 2);
    }
  }
}