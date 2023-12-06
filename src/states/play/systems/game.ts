import type { Game } from "../../../components/game";
import { GameType } from "../../../components/game";
import { getEntityComponent, hasEntityComponent } from "../../../ecs/entity";
import type { System } from "../../../ecs/system";
import {
	queueEvent,
	subscribe,
	type World,
	type WorldEventListener,
} from "../../../ecs/world";
import { GameStartEvent, LevelStartEvent } from "../events";

const getGameComponent = (world: World): Game => {
	const gameEntity = world.entities.find((entity) =>
		hasEntityComponent(entity, GameType),
	);

	if (!gameEntity) {
		throw new Error("Game entity not found");
	}
	return getEntityComponent<Game>(gameEntity, GameType);
};

export type CreateGameSystemArgs = {
	world: World;
};

export const createGameSystem = ({ world }: CreateGameSystemArgs): System => {
	const handleGameStart: WorldEventListener<GameStartEvent> = () => {
		const game = getGameComponent(world);
		game.hasStarted = true;
		game.level = 1;

		queueEvent(world, new LevelStartEvent(1));
	};

	subscribe(world, GameStartEvent.type, handleGameStart);

	return {
		execute: (entities, deltaTime) => {
			const gameEntity = entities.find((entity) =>
				hasEntityComponent(entity, GameType),
			);

			if (!gameEntity) {
				return;
			}

			const game = getEntityComponent<Game>(gameEntity, GameType);

			if (game.hasStarted) {
				game.totalTime += deltaTime;
			}
		},
	};
};
