export const STORAGE_KEY = 'snake-top-score';

export interface GameConfig {
  width: number;
  height: number;
  backgroundColor: string;
  gridSize: number;
  snakeSpeed: number;
  initialSnakeLength: number;
}

export interface GridPosition {
  x: number;
  y: number;
}

export enum Direction {
  UP,
  DOWN,
  LEFT,
  RIGHT
}

export const gameConfig: GameConfig = {
  width: 800,
  height: 600,
  backgroundColor: '#34495e',
  gridSize: 20, // Size of each grid cell
  snakeSpeed: 10, // Grid cells per second
  initialSnakeLength: 3
};

export const getTopScore = (): number => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? parseInt(stored, 10) : 0;
};

export const setTopScore = (score: number): void => {
  const currentTop = getTopScore();
  if (score > currentTop) {
    localStorage.setItem(STORAGE_KEY, score.toString());
  }
}; 