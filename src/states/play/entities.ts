import { createAcceleration } from "../../components/acceleration";
import { createFriction } from "../../components/friction";
import { createInput } from "../../components/input";
import { createMaxSpeed } from "../../components/max-speed";
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
