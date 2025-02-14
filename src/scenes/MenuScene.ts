import { Scene } from 'phaser';
import { gameConfig, getTopScore } from '../config/gameConfig';

export class MenuScene extends Scene {
  constructor() {
    super({ key: 'MenuScene' });
  }

  create() {
    const { width, height } = gameConfig;

    // Title
    const title = this.add.text(width / 2, height / 3, 'Snake', {
      fontSize: '64px',
      color: '#ffffff',
      fontStyle: 'bold'
    });
    title.setOrigin(0.5);

    // Top Score
    const topScore = getTopScore();
    const scoreText = this.add.text(width / 2, height / 2, `Top Score: ${topScore}`, {
      fontSize: '32px',
      color: '#ffffff'
    });
    scoreText.setOrigin(0.5);

    // Start Button
    const startButton = this.add.rectangle(width / 2, height * 0.7, 200, 50, 0x00ff00);
    const startText = this.add.text(width / 2, height * 0.7, 'Start Game', {
      fontSize: '24px',
      color: '#000000'
    });
    startText.setOrigin(0.5);

    // Make button interactive
    startButton.setInteractive();
    startButton.on('pointerover', () => {
      startButton.setFillStyle(0x00dd00);
      this.input.setDefaultCursor('pointer');
    });
    startButton.on('pointerout', () => {
      startButton.setFillStyle(0x00ff00);
      this.input.setDefaultCursor('default');
    });
    startButton.on('pointerdown', () => {
      startButton.setFillStyle(0x00bb00);
    });
    startButton.on('pointerup', () => {
      this.scene.start('GameScene');
    });
  }
} 