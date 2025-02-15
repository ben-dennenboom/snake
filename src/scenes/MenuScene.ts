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
      fontFamily: 'monospace',
      fontSize: '48px',
      color: gameConfig.pixelColor,
      align: 'center'
    });
    title.setOrigin(0.5);

    // Top Score
    const topScore = getTopScore();
    const scoreText = this.add.text(width / 2, height / 2, `Top Score: ${topScore}`, {
      fontFamily: 'monospace',
      fontSize: '24px',
      color: gameConfig.pixelColor,
      align: 'center'
    });
    scoreText.setOrigin(0.5);

    // Start Button
    const buttonWidth = 200;
    const buttonHeight = 50;
    const button = this.add.rectangle(
      width / 2,
      height * 0.7,
      buttonWidth,
      buttonHeight,
      parseInt(gameConfig.pixelColor.replace('#', '0x'))
    );
    
    const buttonText = this.add.text(
      width / 2,
      height * 0.7,
      'Start Game',
      {
        fontFamily: 'monospace',
        fontSize: '16px',
        color: gameConfig.screenColor,
        align: 'center'
      }
    );
    buttonText.setOrigin(0.5);

    // Delay button interaction to prevent accidental clicks during scene transition
    this.time.delayedCall(200, () => {
      // Make button interactive
      button.setInteractive();
      
      button.on('pointerover', () => {
        button.setFillStyle(parseInt(gameConfig.pixelColor.replace('#', '0x')), 0.8);
      });
      
      button.on('pointerout', () => {
        button.setFillStyle(parseInt(gameConfig.pixelColor.replace('#', '0x')));
      });
      
      button.on('pointerdown', () => {
        // Disable button immediately to prevent multiple clicks
        button.disableInteractive();
        this.scene.start('GameScene');
      });
    });
  }
} 