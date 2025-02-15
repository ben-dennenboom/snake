export const STORAGE_KEY = 'snake-top-score';

export interface GameConfig {
  width: number;
  height: number;
  backgroundColor: string;
  gridSize: number;
  snakeSpeed: number;
  initialSnakeLength: number;
  // Nokia 5110 colors
  pixelColor: string;
  screenColor: string;
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
  // Original resolution scaled up by 6 for visibility (84x48 * 6)
  width: 504,
  height: 288,
  backgroundColor: '#C3CFA1', // Nokia 5110 greenish background
  gridSize: 6, // Each Nokia "pixel" is 6x6 screen pixels
  snakeSpeed: 10,
  initialSnakeLength: 3,
  pixelColor: '#1F1F1F', // Dark pixels
  screenColor: '#C3CFA1' // LCD background color
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