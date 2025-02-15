import { Direction, GridPosition, gameConfig } from '../config/gameConfig';
import * as Phaser from 'phaser';

export class Snake {
  private segments: Phaser.GameObjects.Rectangle[] = [];
  private positions: GridPosition[] = [];
  private scene: Phaser.Scene;
  private color: string;
  private direction: Direction;
  private nextDirection: Direction;
  private growing: boolean;

  constructor(scene: Phaser.Scene, color: string) {
    this.scene = scene;
    this.color = color;
    this.direction = Direction.RIGHT;
    this.nextDirection = Direction.RIGHT;
    this.growing = false;
    this.createInitialSnake();
  }

  private createInitialSnake() {
    // Clear existing snake
    this.segments.forEach(segment => segment.destroy());
    this.segments = [];
    this.positions = [];

    // Create initial snake segments
    const startX = Math.floor(gameConfig.width / gameConfig.gridSize / 4);
    const startY = Math.floor(gameConfig.height / gameConfig.gridSize / 2);

    for (let i = 0; i < gameConfig.initialSnakeLength; i++) {
      // Add grid position
      this.positions.push({
        x: startX - i,
        y: startY
      });

      // Add visual segment
      const segment = this.scene.add.rectangle(
        (startX - i) * gameConfig.gridSize,
        startY * gameConfig.gridSize,
        gameConfig.gridSize - 1,
        gameConfig.gridSize - 1,
        parseInt(this.color.replace('#', '0x'))
      );
      this.segments.push(segment);
    }
  }

  move() {
    if (this.growing) {
      this.growing = false;
    } else {
      // Remove tail
      const tailSegment = this.segments.pop();
      if (tailSegment) {
        tailSegment.destroy();
      }
      this.positions.pop();
    }

    // Calculate new head position
    const head = { ...this.positions[0] };
    this.direction = this.nextDirection;

    switch (this.direction) {
      case Direction.UP:
        head.y--;
        break;
      case Direction.DOWN:
        head.y++;
        break;
      case Direction.LEFT:
        head.x--;
        break;
      case Direction.RIGHT:
        head.x++;
        break;
    }

    // Add new head
    this.positions.unshift(head);
    const newSegment = this.scene.add.rectangle(
      head.x * gameConfig.gridSize,
      head.y * gameConfig.gridSize,
      gameConfig.gridSize - 1,
      gameConfig.gridSize - 1,
      parseInt(this.color.replace('#', '0x'))
    );
    this.segments.unshift(newSegment);
  }

  grow() {
    this.growing = true;
  }

  setDirection(newDirection: Direction) {
    // Prevent 180-degree turns
    if (
      (this.direction === Direction.UP && newDirection === Direction.DOWN) ||
      (this.direction === Direction.DOWN && newDirection === Direction.UP) ||
      (this.direction === Direction.LEFT && newDirection === Direction.RIGHT) ||
      (this.direction === Direction.RIGHT && newDirection === Direction.LEFT)
    ) {
      return;
    }
    this.nextDirection = newDirection;
  }

  getHead(): GridPosition {
    return this.positions[0];
  }

  getBody(): GridPosition[] {
    return this.positions;
  }

  checkCollision(): boolean {
    const head = this.getHead();
    
    // Check wall collision
    if (
      head.x < 0 ||
      head.x >= gameConfig.width / gameConfig.gridSize ||
      head.y < 0 ||
      head.y >= gameConfig.height / gameConfig.gridSize
    ) {
      return true;
    }

    // Check self collision (skip head)
    for (let i = 1; i < this.positions.length; i++) {
      if (head.x === this.positions[i].x && head.y === this.positions[i].y) {
        return true;
      }
    }

    return false;
  }

  destroy() {
    this.segments.forEach(segment => segment.destroy());
    this.segments = [];
    this.positions = [];
  }
} 