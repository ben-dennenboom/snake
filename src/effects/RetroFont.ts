export class RetroFont {
  static readonly FONT_DATA = {
    charWidth: 5,
    charHeight: 8,
    spacing: 1,
    chars: {
      // Each character is represented as a 5x8 bitmap
      // 1 represents a pixel, 0 represents empty space
      'A': [
        [0,1,1,0,0],
        [1,0,0,1,0],
        [1,0,0,1,0],
        [1,1,1,1,0],
        [1,0,0,1,0],
        [1,0,0,1,0],
        [1,0,0,1,0],
        [0,0,0,0,0]
      ],
      // Add more characters as needed...
    }
  };

  static createText(scene: Phaser.Scene, x: number, y: number, text: string, scale: number = 1) {
    const graphics = scene.add.graphics();
    graphics.fillStyle(parseInt(scene.game.config.backgroundColor as string, 16));

    let currentX = x;
    const pixelSize = scale;

    for (const char of text.toUpperCase()) {
      if (this.FONT_DATA.chars[char]) {
        const bitmap = this.FONT_DATA.chars[char];
        for (let row = 0; row < this.FONT_DATA.charHeight; row++) {
          for (let col = 0; col < this.FONT_DATA.charWidth; col++) {
            if (bitmap[row][col]) {
              graphics.fillRect(
                currentX + col * pixelSize,
                y + row * pixelSize,
                pixelSize,
                pixelSize
              );
            }
          }
        }
      }
      currentX += (this.FONT_DATA.charWidth + this.FONT_DATA.spacing) * pixelSize;
    }

    return graphics;
  }
} 