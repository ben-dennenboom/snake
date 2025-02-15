import { Scene } from 'phaser';
import { gameConfig } from '../config/gameConfig';

export class RetroEffect {
  private scene: Scene;
  private screenBorder!: Phaser.GameObjects.Graphics;
  private readonly borderWidth = 20;
  private readonly borderRadius = 10;

  constructor(scene: Scene) {
    this.scene = scene;
    this.createScreenBorder();
  }

  private createScreenBorder() {
    // Create border container
    this.screenBorder = this.scene.add.graphics();
    
    // Create a dark border frame only around the edges
    this.screenBorder.lineStyle(this.borderWidth, 0x1a1a1a);
    this.screenBorder.strokeRoundedRect(
      -this.borderWidth / 2,
      -this.borderWidth / 2,
      gameConfig.width + this.borderWidth,
      gameConfig.height + this.borderWidth,
      this.borderRadius
    );
  }

  update() {
    // No update needed for static border
  }

  destroy() {
    this.screenBorder.destroy();
  }
} 