import type { Game } from "../../../components/game";
import { GameType } from "../../../components/game";
import { GAME_HEIGHT, GAME_WIDTH } from "../../../contants";
import { getEntityComponent, hasEntityComponents } from "../../../ecs/entity";
import type { System } from "../../../ecs/system";
import type { WorldEventListener } from "../../../ecs/world";
import { subscribe, type World } from "../../../ecs/world";
import { createAsteroidEntity } from "../entities";
import { LevelStartEvent } from "../events";

export type CreateAsteroidSpawnerSystemArgs = {
	world: World;
};

export const createAsteroidSpawnerSystem = ({
	world,
}: CreateAsteroidSpawnerSystemArgs): System => {
	const handleLevelStart: WorldEventListener<LevelStartEvent> = () => {
		const gameEntity = world.entities.find((entity) =>
			hasEntityComponents(entity, GameType),
		);

		if (!gameEntity) {
			return;
		}

		const game = getEntityComponent<Game>(gameEntity, GameType);

		for (let i = 0; i < game.level + 3; i++) {
			createAsteroidEntity({
				rotation: Math.random() * (Math.PI * 2),
				type: "LARGE",
				world,
				x: Math.random() * GAME_WIDTH,
				y: Math.random() * GAME_HEIGHT,
			});
		}
	};

	subscribe(world, LevelStartEvent.type, handleLevelStart);

	return {
		execute: () => {
			// do nothing
		},
	};
};
