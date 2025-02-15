import { Scene } from 'phaser';
import { gameConfig, Direction, GridPosition, setTopScore, getTopScore } from '../config/gameConfig';
import { Snake } from '../game/Snake';

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

  constructor() {
    super({ key: 'GameScene' });
  }

  init() {
    // Reset game state
    this.score = 0;
    this.moveTimer = 0;
    this.gameOver = false;
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

    // Setup keyboard controls
    this.setupControls();
  }

  private setupControls() {
    // Clean up existing key bindings if they exist
    this.input.keyboard?.removeAllKeys(true);

    // Add new key bindings
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
  }

  update(time: number, delta: number) {
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
    const text = this.add.text(gameConfig.width / 2, gameConfig.height / 2, 
      'Game Over!\nPress ESC to return to menu', {
      align: 'center',
      fontSize: '48px',
      color: '#ff0000'
    });
    text.setOrigin(0.5);
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