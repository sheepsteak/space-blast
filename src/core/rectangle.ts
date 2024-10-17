export type Rectangle = {
  height: number;
  width: number;
  x: number;
  y: number;
};

export const createRectangle = (
  x: number,
  y: number,
  width: number,
  height: number,
): Rectangle => ({
  height,
  width,
  x,
  y,
});

export const intersects = (a: Rectangle, b: Rectangle): boolean =>
  a.x < b.x + b.width &&
  a.x + a.width > b.x &&
  a.y < b.y + b.height &&
  a.y + a.height > b.y;
