import { createAcceleration } from "../../components/acceleration";
import { createFriction } from "../../components/friction";
import { createInput } from "../../components/input";
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
import { createInputCommandsSystem } from "./systems/input-commands";
import { createInputProcessSystem } from "./systems/input-process";
import { createMoveSystem } from "./systems/move";
import { createRenderSystem } from "./systems/render";

export interface CreatePlayStateArgs {
	context: CanvasRenderingContext2D;
	keyboardListener: KeyboardListener;
	sprites: LoadSpritesResult;
}

export const createPlayState = ({
	context,
	keyboardListener,
	sprites,
}: CreatePlayStateArgs): GameState => {
	const world = createWorld();
	addSystem(world, createInputCommandsSystem({ keyboardListener }));
	addSystem(world, createInputProcessSystem());
	addSystem(world, createMoveSystem());
	addSystem(world, createBoundsSystem());
	addRenderSystem(world, createRenderSystem({ context, sprites }));

	const player = createEntity(world);
	addEntityComponent(player, createAcceleration());
	addEntityComponent(player, createFriction(0.99));
	addEntityComponent(
		player,
		createPosition({ x: GAME_WIDTH / 2, y: GAME_HEIGHT / 2 }),
	);
	addEntityComponent(player, createRotation(toRadians(-90)));
	addEntityComponent(player, createSprite("player"));
	addEntityComponent(player, createVelocity({ x: 0, y: 0 }));
	addEntityComponent(player, createMaxSpeed(300));
	addEntityComponent(player, createInput(["Thrust", "TurnLeft", "TurnRight"]));

	return {
		update(delta) {
			update(world, delta);
		},
		render(delta) {
			context.fillStyle = "black";
			context.fillRect(0, 0, context.canvas.width, context.canvas.height);
			context.save();

			render(world, delta);

			context.restore();
		},
	};
};
