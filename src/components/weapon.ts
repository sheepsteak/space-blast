import type { Component } from "../ecs/component";

export const WeaponType = "WEAPON";

export type Weapon = {
  fireRate: number;
  lastFired: number;
  type: typeof WeaponType;
} & Component;

export const createWeapon = (fireRate: number): Weapon => ({
  fireRate,
  lastFired: 0,
  type: WeaponType,
});
