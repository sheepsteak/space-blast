import { createAcceleration } from "../../components/acceleration";
import { createFriction } from "../../components/friction";
import { createInput } from "../../components/input";
import { createMaxSpeed } from "../../components/max-speed";
import { createPlayerBullet } from "../../components/player-bullet";
import { createPosition } from "../../components/position";
import { createRotation } from "../../components/rotation";
import { createSprite } from "../../components/sprite";
import { createVelocity } from "../../components/velocity";
import { createWeapon } from "../../components/weapon";
import type { Entity } from "../../ecs/entity";
import { addEntityComponent } from "../../ecs/entity";
import type { World } from "../../ecs/world";
import { createEntity } from "../../ecs/world";
import { toRadians } from "../../math";

export interface CreateBulletArgs {
	dx: number;
	dy: number;
	rotation: number;
	world: World;
	x: number;
	y: number;
}

export const createPlayerBulletEntity = ({
	dx,
	dy,
	world,
	x,
	y,
}: CreateBulletArgs): Entity => {
	const bullet = createEntity(world);
	addEntityComponent(bullet, createAcceleration());
	addEntityComponent(bullet, createFriction(1));
	addEntityComponent(bullet, createPlayerBullet());
	addEntityComponent(bullet, createPosition({ x, y }));
	addEntityComponent(bullet, createRotation(toRadians(-90)));
	addEntityComponent(bullet, createSprite("bullet"));
	addEntityComponent(bullet, createVelocity({ x: dx, y: dy }));

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
	addEntityComponent(player, createSprite("player"));
	addEntityComponent(player, createVelocity({ x: 0, y: 0 }));
	addEntityComponent(player, createMaxSpeed(300));
	addEntityComponent(
		player,
		createInput(["Fire", "Thrust", "TurnLeft", "TurnRight"]),
	);
	addEntityComponent(player, createWeapon(0.3));

	return player;
};
