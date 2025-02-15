import { Scene } from 'phaser';
import { RetroEffect } from '../effects/RetroEffect';
import { gameConfig } from '../config/gameConfig';

export class BaseScene extends Scene {
  protected retroEffect!: RetroEffect;

  create() {
    // Set the camera background color to match the game config
    this.cameras.main.setBackgroundColor(gameConfig.backgroundColor);
    
    // Create retro effects
    this.retroEffect = new RetroEffect(this);
  }

  update(_time: number, _delta: number) {
    // Update retro effects
    this.retroEffect.update();
  }

  shutdown() {
    if (this.retroEffect) {
      this.retroEffect.destroy();
    }
  }
} 