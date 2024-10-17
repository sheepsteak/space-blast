export type Vector2 = {
  x: number;
  y: number;
};

export const vector2Create = (x: number, y: number): Vector2 => ({
  x,
  y,
});

export const vector2Length = (vector: Vector2): number =>
  Math.sqrt(vector.x * vector.x + vector.y * vector.y);

export const vector2Normalize = (vector: Vector2): Vector2 => {
  const length = vector2Length(vector);

  if (length === 0) {
    return { x: 0, y: 0 };
  }

  return {
    x: vector.x / length,
    y: vector.y / length,
  };
};

export const vector2Scale = (vector: Vector2, scale: number): Vector2 => ({
  x: vector.x * scale,
  y: vector.y * scale,
});
