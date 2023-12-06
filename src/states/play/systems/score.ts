import type { Asteroid } from "../../../components/asteroid";
import { AsteroidType } from "../../../components/asteroid";
import type { Game } from "../../../components/game";
import { GameType } from "../../../components/game";
import { getEntityComponent, hasEntityComponents } from "../../../ecs/entity";
import type { System } from "../../../ecs/system";
import {
	getEntity,
	subscribe,
	type World,
	type WorldEventListener,
} from "../../../ecs/world";
import { AsteroidDeathEvent } from "../events";

export type CreateScoreSystemArgs = {
	world: World;
};

export const createScoreSystem = ({ world }: CreateScoreSystemArgs): System => {
	const handleAsteroidDeath: WorldEventListener<AsteroidDeathEvent> = (e) => {
		const asteroidEntity = getEntity(world, e.entityId);
		const gameEntity = world.entities.find((entity) =>
			hasEntityComponents(entity, GameType),
		);

		if (!asteroidEntity || !gameEntity) {
			return;
		}

		const asteroid = getEntityComponent<Asteroid>(asteroidEntity, AsteroidType);
		const game = getEntityComponent<Game>(gameEntity, GameType);

		switch (asteroid.size) {
			case "LARGE":
				game.score += 20;
				break;
			case "MEDIUM":
				game.score += 50;
				break;
			case "SMALL":
				game.score += 100;
				break;
		}
	};

	subscribe(world, AsteroidDeathEvent.type, handleAsteroidDeath);

	return {
		// eslint-disable-next-line @typescript-eslint/no-empty-function
		execute: () => {},
	};
};
