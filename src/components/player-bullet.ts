import type { Component } from "../ecs/component";

export const PlayerBulletType = "PLAYERBULLET";

export type PlayerBullet = {
  type: typeof PlayerBulletType;
} & Component;

export const createPlayerBullet = (): PlayerBullet => ({
  type: PlayerBulletType,
});
