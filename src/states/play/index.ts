import { GAME_HEIGHT, GAME_WIDTH } from "../../contants";
import type { KeyboardListener } from "../../core/keys";
import type { GameState } from "../../core/state";
import {
	addRenderSystem,
	addSystem,
	createWorld,
	render,
	update,
} from "../../ecs/world";
import type { LoadSpritesResult } from "../../loader";
import { createPlayerEntity } from "./entities";
import { createBoundsSystem } from "./systems/bounds";
import { createInputCommandsSystem } from "./systems/input-commands";
import { createInputProcessSystem } from "./systems/input-process";
import { createLifetimeSystem } from "./systems/lifetime";
import { createMoveSystem } from "./systems/move";
import { createRenderSystem } from "./systems/render";

export type CreatePlayStateArgs = {
	context: CanvasRenderingContext2D;
	keyboardListener: KeyboardListener;
	sprites: LoadSpritesResult;
};

export const createPlayState = ({
	context,
	keyboardListener,
	sprites,
}: CreatePlayStateArgs): GameState => {
	const world = createWorld();
	addSystem(world, createLifetimeSystem({ world }));
	addSystem(world, createInputCommandsSystem({ keyboardListener }));
	addSystem(world, createInputProcessSystem({ world }));
	addSystem(world, createMoveSystem());
	addSystem(world, createBoundsSystem());
	addRenderSystem(world, createRenderSystem({ context, sprites }));

	createPlayerEntity({
		rotation: -90,
		world,
		x: GAME_WIDTH / 2,
		y: GAME_HEIGHT / 2,
	});

	return {
		render(delta) {
			context.drawImage(sprites.background, 0, 0, GAME_WIDTH, GAME_HEIGHT);
			context.save();

			render(world, delta);

			context.restore();
		},
		update(delta) {
			update(world, delta);
		},
	};
};
