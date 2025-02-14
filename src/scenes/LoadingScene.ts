import { Scene } from 'phaser';
import { gameConfig } from '../config/gameConfig';

export class LoadingScene extends Scene {
  constructor() {
    super({ key: 'LoadingScene' });
  }

  preload() {
    // Create loading bar
    const width = gameConfig.width;
    const height = gameConfig.height;
    
    const progressBar = this.add.graphics();
    const progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(width / 4, height / 2 - 30, width / 2, 50);
    
    // Loading text
    const loadingText = this.add.text(width / 2, height / 2 - 50, 'Loading...', {
      font: '20px monospace',
      color: '#ffffff'
    });
    loadingText.setOrigin(0.5, 0.5);
    
    // Progress text
    const percentText = this.add.text(width / 2, height / 2, '0%', {
      font: '18px monospace',
      color: '#ffffff'
    });
    percentText.setOrigin(0.5, 0.5);

    // Update progress bar
    this.load.on('progress', (value: number) => {
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(width / 4 + 10, height / 2 - 20, (width / 2 - 20) * value, 30);
      percentText.setText(parseInt((value * 100).toString()) + '%');
    });

    // Clean up when loading complete
    this.load.on('complete', () => {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
      
      this.scene.start('MenuScene');
    });

    // Load your game assets here
    // this.load.image('food', 'assets/food.png');
    // this.load.image('snake', 'assets/snake.png');
    // etc...
  }
} 