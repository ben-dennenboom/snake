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
  private candy!: GridPosition;
  private gridWidth!: number;
  private gridHeight!: number;
  private graphics!: Phaser.GameObjects.Graphics;
  private moveTimer!: number;
  private score: number = 0;
  private scoreText!: Phaser.GameObjects.Text;
  private gameOver: boolean = false;
  private swipeState: SwipeState | null = null;
  private readonly minSwipeDistance: number = 30; // Minimum distance for a swipe
  private readonly maxSwipeTime: number = 1000; // Maximum time for a swipe in ms

  constructor() {
    super({ key: 'GameScene' });
  }

  init() {
    // Reset game state
    this.score = 0;
    this.moveTimer = 0;
    this.gameOver = false;
    this.swipeState = null;
  }

  create() {
    // Calculate grid dimensions
    this.gridWidth = Math.floor(gameConfig.width / gameConfig.gridSize);
    this.gridHeight = Math.floor(gameConfig.height / gameConfig.gridSize);

    // Initialize snake in the middle of the grid
    const startPos: GridPosition = {
      x: Math.floor(this.gridWidth / 2),
      y: Math.floor(this.gridHeight / 2)
    };
    this.snake = new Snake(startPos);

    // Create graphics object for drawing
    this.graphics = this.add.graphics();

    // Spawn initial candy
    this.spawnCandy();

    // Setup score display
    this.scoreText = this.add.text(16, 16, 'Score: 0', {
      fontSize: '32px',
      color: '#ffffff'
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
      this.swipeState = {
        startX: pointer.x,
        startY: pointer.y,
        startTime: Date.now()
      };
    });

    this.input.on('pointerup', (pointer: Phaser.Input.Pointer) => {
      if (!this.swipeState) return;

      const swipeTime = Date.now() - this.swipeState.startTime;
      if (swipeTime > this.maxSwipeTime) {
        this.swipeState = null;
        return;
      }

      const deltaX = pointer.x - this.swipeState.startX;
      const deltaY = pointer.y - this.swipeState.startY;
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

      this.swipeState = null;
    });

    // Cancel swipe on pointer move out
    this.input.on('pointerout', () => {
      this.swipeState = null;
    });
  }

  update(_time: number, delta: number) {
    if (this.gameOver) return;

    // Update move timer
    this.moveTimer += delta;
    if (this.moveTimer >= 1000 / gameConfig.snakeSpeed) {
      this.moveTimer = 0;
      this.updateGame();
    }

    // Draw game state
    this.drawGame();
  }

  private updateGame() {
    // Move snake
    this.snake.update();

    // Check for candy collision
    const head = this.snake.getHead();
    if (head.x === this.candy.x && head.y === this.candy.y) {
      this.snake.grow();
      this.score++;
      this.scoreText.setText(`Score: ${this.score}`);
      this.spawnCandy();
    }

    // Check for collisions
    if (
      this.snake.checkWallCollision(this.gridWidth, this.gridHeight) ||
      this.snake.checkSelfCollision()
    ) {
      this.handleGameOver();
    }
  }

  private drawGame() {
    this.graphics.clear();

    // Draw snake
    this.graphics.fillStyle(0x00ff00); // Green
    const body = this.snake.getBody();
    body.forEach(segment => {
      this.graphics.fillRect(
        segment.x * gameConfig.gridSize,
        segment.y * gameConfig.gridSize,
        gameConfig.gridSize - 1,
        gameConfig.gridSize - 1
      );
    });

    // Draw candy
    this.graphics.fillStyle(0xff0000); // Red
    this.graphics.fillRect(
      this.candy.x * gameConfig.gridSize,
      this.candy.y * gameConfig.gridSize,
      gameConfig.gridSize - 1,
      gameConfig.gridSize - 1
    );
  }

  private spawnCandy() {
    do {
      this.candy = {
        x: Math.floor(Math.random() * this.gridWidth),
        y: Math.floor(Math.random() * this.gridHeight)
      };
    } while (this.snake.checkCollision(this.candy));
  }

  private handleGameOver() {
    this.gameOver = true;
    
    // Update top score if necessary
    setTopScore(this.score);

    // Show game over text
    const gameOverText = this.add.text(gameConfig.width / 2, gameConfig.height / 2 - 50, 
      'Game Over!', {
      align: 'center',
      fontSize: '48px',
      color: '#ff0000'
    });
    gameOverText.setOrigin(0.5);

    // Create return to menu button
    const buttonWidth = 200;
    const buttonHeight = 50;
    const button = this.add.rectangle(
      gameConfig.width / 2,
      gameConfig.height / 2 + 50,
      buttonWidth,
      buttonHeight,
      0x00ff00
    );
    
    const buttonText = this.add.text(gameConfig.width / 2, gameConfig.height / 2 + 50,
      'Return to Menu', {
      fontSize: '24px',
      color: '#000000'
    });
    buttonText.setOrigin(0.5);

    // Make button interactive
    button.setInteractive();
    
    // Add hover effects
    button.on('pointerover', () => {
      button.setFillStyle(0x00dd00);
      this.input.setDefaultCursor('pointer');
    });
    
    button.on('pointerout', () => {
      button.setFillStyle(0x00ff00);
      this.input.setDefaultCursor('default');
    });
    
    button.on('pointerdown', () => {
      this.cleanupScene();
      this.scene.start('MenuScene');
    });

    // Keep keyboard ESC functionality for desktop
    this.input.keyboard?.addKey('ESC').on('down', () => {
      this.cleanupScene();
      this.scene.start('MenuScene');
    });
  }

  private cleanupScene() {
    // Clear graphics
    if (this.graphics) {
      this.graphics.clear();
      this.graphics.destroy();
    }

    // Remove keyboard bindings
    this.input.keyboard?.removeAllKeys(true);
  }

  shutdown() {
    this.cleanupScene();
  }
} 