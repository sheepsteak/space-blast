import { createAcceleration } from "../../components/acceleration";
import { createFriction } from "../../components/friction";
import { createMaxSpeed } from "../../components/max-speed";
import { createPosition } from "../../components/position";
import { createRotation } from "../../components/rotation";
import { createSprite } from "../../components/sprite";
import { createVelocity } from "../../components/velocity";
import { GAME_HEIGHT, GAME_WIDTH } from "../../contants";
import type { KeyboardListener } from "../../core/keys";
import type { GameState } from "../../core/state";
import { addEntityComponent } from "../../ecs/entity";
import {
	addRenderSystem,
	addSystem,
	createEntity,
	createWorld,
	render,
	update,
} from "../../ecs/world";
import type { LoadSpritesResult } from "../../loader";
import { toRadians } from "../../math";
import { createBoundsSystem } from "./systems/bounds";
import { createMoveSystem } from "./systems/move";
import { createRenderSystem } from "./systems/render";

export interface CreatePlayStateArgs {
	keyboardListener: KeyboardListener;
	root: HTMLElement;
	sprites: LoadSpritesResult;
}

export const createPlayState = ({
	root,
	sprites,
}: CreatePlayStateArgs): GameState => {
	const world = createWorld();
	addSystem(world, createMoveSystem());
	addSystem(world, createBoundsSystem());
	addRenderSystem(
		world,
		createRenderSystem({ htmlElement: root, spritesMap: sprites }),
	);

	const player = createEntity(world);
	addEntityComponent(player, createAcceleration());
	addEntityComponent(player, createFriction(0.99));
	addEntityComponent(
		player,
		createPosition({ x: GAME_WIDTH / 2, y: GAME_HEIGHT / 2 }),
	);
	addEntityComponent(player, createRotation(toRadians(-90)));
	addEntityComponent(player, createSprite("player"));
	addEntityComponent(player, createVelocity({ x: 0, y: -1 }));
	addEntityComponent(player, createMaxSpeed(1));

	return {
		update(delta) {
			update(world, delta);
		},
		render(delta) {
			render(world, delta);
		},
	};
};
