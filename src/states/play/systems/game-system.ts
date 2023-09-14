import type { Game } from "../../../components/game";
import { GameType } from "../../../components/game";
import { getEntityComponent, hasEntityComponent } from "../../../ecs/entity";
import type { System } from "../../../ecs/system";
import {
	dispatchEvent,
	subscribe,
	type World,
	type WorldEventListener,
} from "../../../ecs/world";
import { GameStart, LevelStart } from "../events";

export type CreateGameSystemArgs = {
	world: World;
};

export const createGameSystem = ({ world }: CreateGameSystemArgs): System => {
	const handleGameStart: WorldEventListener<GameStart> = () => {
		const gameEntity = world.entities.find((entity) =>
			hasEntityComponent(entity, GameType),
		);

		if (!gameEntity) {
			return;
		}

		const game = getEntityComponent<Game>(gameEntity, GameType);

		game.hasStarted = true;
		game.level = 1;

		dispatchEvent(world, new LevelStart(1));
	};

	subscribe(world, GameStart.type, handleGameStart);

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
