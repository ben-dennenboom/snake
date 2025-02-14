import { Direction, GridPosition, gameConfig } from '../config/gameConfig';

export class Snake {
  private body: GridPosition[];
  private direction: Direction;
  private nextDirection: Direction;
  private growing: boolean;

  constructor(startPosition: GridPosition) {
    this.direction = Direction.RIGHT;
    this.nextDirection = Direction.RIGHT;
    this.growing = false;
    
    // Initialize snake body
    this.body = [];
    for (let i = 0; i < gameConfig.initialSnakeLength; i++) {
      this.body.push({
        x: startPosition.x - i,
        y: startPosition.y
      });
    }
  }

  update(): void {
    // Update direction
    this.direction = this.nextDirection;

    // Calculate new head position
    const head = this.body[0];
    const newHead: GridPosition = { x: head.x, y: head.y };

    switch (this.direction) {
      case Direction.UP:
        newHead.y--;
        break;
      case Direction.DOWN:
        newHead.y++;
        break;
      case Direction.LEFT:
        newHead.x--;
        break;
      case Direction.RIGHT:
        newHead.x++;
        break;
    }

    // Add new head
    this.body.unshift(newHead);

    // Remove tail if not growing
    if (!this.growing) {
      this.body.pop();
    } else {
      this.growing = false;
    }
  }

  setDirection(newDirection: Direction): void {
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

  grow(): void {
    this.growing = true;
  }

  getHead(): GridPosition {
    return this.body[0];
  }

  getBody(): GridPosition[] {
    return this.body;
  }

  checkCollision(position: GridPosition): boolean {
    return this.body.some(segment => 
      segment.x === position.x && segment.y === position.y
    );
  }

  checkSelfCollision(): boolean {
    const head = this.getHead();
    return this.body.slice(1).some(segment => 
      segment.x === head.x && segment.y === head.y
    );
  }

  checkWallCollision(gridWidth: number, gridHeight: number): boolean {
    const head = this.getHead();
    return (
      head.x < 0 ||
      head.x >= gridWidth ||
      head.y < 0 ||
      head.y >= gridHeight
    );
  }
} 