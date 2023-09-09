import { createAcceleration } from "../../components/acceleration";
import { createFriction } from "../../components/friction";
import { createInput } from "../../components/input";
import { createLifetime } from "../../components/lifetime";
import { createMaxSpeed } from "../../components/max-speed";
import { createPlayerBullet } from "../../components/player-bullet";
import { createPosition } from "../../components/position";
import { createRotation } from "../../components/rotation";
import { createSize } from "../../components/size";
import { createSprite } from "../../components/sprite";
import { createVelocity } from "../../components/velocity";
import { createWeapon } from "../../components/weapon";
import type { Entity } from "../../ecs/entity";
import { addEntityComponent } from "../../ecs/entity";
import type { World } from "../../ecs/world";
import { createEntity } from "../../ecs/world";
import { toRadians } from "../../math";

const PLAYER_BULLET_SPEED = 500;
export interface CreateBulletArgs {
	rotation: number;
	world: World;
	x: number;
	y: number;
}

export const createPlayerBulletEntity = ({
	rotation,
	world,
	x,
	y,
}: CreateBulletArgs): Entity => {
	const bullet = createEntity(world);
	addEntityComponent(bullet, createAcceleration());
	addEntityComponent(bullet, createFriction(1));
	addEntityComponent(bullet, createLifetime(2));
	addEntityComponent(bullet, createPlayerBullet());
	addEntityComponent(bullet, createPosition({ x, y }));
	addEntityComponent(bullet, createRotation(toRadians(rotation)));
	addEntityComponent(bullet, createSize({ x: 8, y: 8 }));
	addEntityComponent(bullet, createSprite("bullet"));
	addEntityComponent(
		bullet,
		createVelocity({
			x: Math.cos(rotation) * PLAYER_BULLET_SPEED,
			y: Math.sin(rotation) * PLAYER_BULLET_SPEED,
		}),
	);

	return bullet;
};

export interface CreatePlayerArgs {
	rotation: number;
	world: World;
	x: number;
	y: number;
}

export const createPlayerEntity = ({
	rotation,
	world,
	x,
	y,
}: CreatePlayerArgs): Entity => {
	const player = createEntity(world);
	addEntityComponent(player, createAcceleration());
	addEntityComponent(player, createFriction(0.99));
	addEntityComponent(player, createPosition({ x, y }));
	addEntityComponent(player, createRotation(toRadians(rotation)));
	addEntityComponent(player, createSize({ x: 48, y: 48 }));
	addEntityComponent(player, createSprite("player"));
	addEntityComponent(player, createVelocity({ x: 0, y: 0 }));
	addEntityComponent(player, createMaxSpeed(300));
	addEntityComponent(
		player,
		createInput(["Fire", "Thrust", "TurnLeft", "TurnRight"]),
	);
	addEntityComponent(player, createWeapon(0.5));

	return player;
};
