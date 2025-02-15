import { Scene } from 'phaser';
import { gameConfig, Direction, GridPosition, setTopScore } from '../config/gameConfig';
import { Snake } from '../game/Snake';

interface SwipeState {
  startX: number;
  startY: number;
  startTime: number;
}

export class GameScene extends Scene {
  private snake!: Snake;
  private candy!: Phaser.GameObjects.Rectangle;
  private score: number = 0;
  private scoreText!: Phaser.GameObjects.Text;
  private lastUpdate: number = 0;
  private swipeStartPosition: { x: number; y: number } | null = null;
  private swipeStartTime: number = 0;
  private readonly minSwipeDistance: number = 30;
  private readonly maxSwipeTime: number = 1000;

  constructor() {
    super({ key: 'GameScene' });
  }

  init() {
    // Reset game state
    this.score = 0;
    this.lastUpdate = 0;
    this.swipeStartPosition = null;
    this.swipeStartTime = 0;
  }

  create() {
    // Initialize snake
    this.snake = new Snake(this, gameConfig.pixelColor);
    
    // Create candy
    this.spawnCandy();
    
    // Add score text with Nokia style
    this.scoreText = this.add.text(10, 10, 'Score: 0', {
      fontFamily: 'monospace',
      fontSize: '16px',
      color: gameConfig.pixelColor
    });

    // Setup controls
    this.setupControls();
  }

  private setupControls() {
    // Clean up existing key bindings if they exist
    this.input.keyboard?.removeAllKeys(true);

    // Keyboard controls
    this.input.keyboard?.addKey('UP').on('down', () => {
      this.snake.setDirection(Direction.UP);
    });
    this.input.keyboard?.addKey('DOWN').on('down', () => {
      this.snake.setDirection(Direction.DOWN);
    });
    this.input.keyboard?.addKey('LEFT').on('down', () => {
      this.snake.setDirection(Direction.LEFT);
    });
    this.input.keyboard?.addKey('RIGHT').on('down', () => {
      this.snake.setDirection(Direction.RIGHT);
    });
    this.input.keyboard?.addKey('ESC').on('down', () => {
      this.cleanupScene();
      this.scene.start('MenuScene');
    });

    // Touch/Swipe controls
    this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
      this.swipeStartPosition = {
        x: pointer.x,
        y: pointer.y
      };
      this.swipeStartTime = Date.now();
    });

    this.input.on('pointerup', (pointer: Phaser.Input.Pointer) => {
      if (!this.swipeStartPosition) return;

      const swipeTime = Date.now() - this.swipeStartTime;
      if (swipeTime > this.maxSwipeTime) {
        this.swipeStartPosition = null;
        this.swipeStartTime = 0;
        return;
      }

      const deltaX = pointer.x - this.swipeStartPosition.x;
      const deltaY = pointer.y - this.swipeStartPosition.y;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      if (distance >= this.minSwipeDistance) {
        // Determine swipe direction based on which axis had the larger change
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
          // Horizontal swipe
          if (deltaX > 0) {
            this.snake.setDirection(Direction.RIGHT);
          } else {
            this.snake.setDirection(Direction.LEFT);
          }
        } else {
          // Vertical swipe
          if (deltaY > 0) {
            this.snake.setDirection(Direction.DOWN);
          } else {
            this.snake.setDirection(Direction.UP);
          }
        }
      }

      this.swipeStartPosition = null;
      this.swipeStartTime = 0;
    });

    // Cancel swipe on pointer move out
    this.input.on('pointerout', () => {
      this.swipeStartPosition = null;
      this.swipeStartTime = 0;
    });
  }

  update(time: number) {
    if (time - this.lastUpdate > 1000 / gameConfig.snakeSpeed) {
      this.lastUpdate = time;

      // Move snake
      this.snake.move();

      // Check for collisions
      if (this.snake.checkCollision()) {
        this.gameOver();
        return;
      }

      // Check for candy collection
      const head = this.snake.getHead();
      const candyX = Math.floor(this.candy.x / gameConfig.gridSize);
      const candyY = Math.floor(this.candy.y / gameConfig.gridSize);

      if (head.x === candyX && head.y === candyY) {
        this.score++;
        this.scoreText.setText(`Score: ${this.score}`);
        this.snake.grow();
        this.spawnCandy();
      }
    }
  }

  private spawnCandy() {
    if (this.candy) {
      this.candy.destroy();
    }

    const gridWidth = Math.floor(gameConfig.width / gameConfig.gridSize);
    const gridHeight = Math.floor(gameConfig.height / gameConfig.gridSize);
    
    let position: GridPosition;
    do {
      position = {
        x: Math.floor(Math.random() * gridWidth),
        y: Math.floor(Math.random() * gridHeight)
      };
    } while (this.snake.getBody().some(segment => 
      segment.x === position.x && segment.y === position.y
    ));

    this.candy = this.add.rectangle(
      position.x * gameConfig.gridSize,
      position.y * gameConfig.gridSize,
      gameConfig.gridSize - 1,
      gameConfig.gridSize - 1,
      parseInt(gameConfig.pixelColor.replace('#', '0x'))
    );
  }

  private gameOver() {
    // Show game over text with Nokia style
    const gameOverText = this.add.text(
      gameConfig.width / 2,
      gameConfig.height / 2 - 50,
      'Game Over!',
      {
        fontFamily: 'monospace',
        fontSize: '24px',
        color: gameConfig.pixelColor,
        align: 'center'
      }
    );
    gameOverText.setOrigin(0.5);

    // Create return to menu button with Nokia style
    const buttonWidth = 200;
    const buttonHeight = 50;
    const button = this.add.rectangle(
      gameConfig.width / 2,
      gameConfig.height / 2 + 50,
      buttonWidth,
      buttonHeight,
      parseInt(gameConfig.pixelColor.replace('#', '0x'))
    );
    
    const buttonText = this.add.text(
      gameConfig.width / 2,
      gameConfig.height / 2 + 50,
      'Return to Menu',
      {
        fontFamily: 'monospace',
        fontSize: '16px',
        color: gameConfig.screenColor,
        align: 'center'
      }
    );
    buttonText.setOrigin(0.5);

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
      this.cleanupScene();
      this.scene.start('MenuScene');
    });

    // Keep keyboard ESC functionality for desktop
    this.input.keyboard?.addKey('ESC').on('down', () => {
      button.disableInteractive();
      this.cleanupScene();
      this.scene.start('MenuScene');
    });
  }

  private cleanupScene() {
    // Remove keyboard bindings
    this.input.keyboard?.removeAllKeys(true);
  }

  shutdown() {
    this.cleanupScene();
  }
} 