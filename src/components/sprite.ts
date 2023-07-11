import type { Component } from "../ecs/component";

export const SpriteType = "SPRITE";

export type Sprite = {
	ref: string;
	type: typeof SpriteType;
} & Component;

export const createSprite = (ref: string): Sprite => ({
	ref,
	type: SpriteType,
});
