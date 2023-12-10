import type { Game } from "../../../components/game";
import { GameType } from "../../../components/game";
import { GAME_HEIGHT, GAME_WIDTH } from "../../../contants";
import { getEntityComponent, hasEntityComponent } from "../../../ecs/entity";
import type { System } from "../../../ecs/system";
import {
	subscribe,
	type World,
	type WorldEventListener,
} from "../../../ecs/world";
import { createPlayerEntity } from "../entities";
import { PlayerDeathEvent } from "../events";

const getGameComponent = (world: World): Game => {
	const gameEntity = world.entities.find((entity) =>
		hasEntityComponent(entity, GameType),
	);

	if (!gameEntity) {
		throw new Error("Game entity not found");
	}
	return getEntityComponent<Game>(gameEntity, GameType);
};

export type CreatePlayerSystemArgs = {
	world: World;
};

export const createPlayerSystem = ({
	world,
}: CreatePlayerSystemArgs): System => {
	const handlePlayerDeath: WorldEventListener<PlayerDeathEvent> = () => {
		const game = getGameComponent(world);
		game.playerDeadCountdown = 2;
	};

	subscribe(world, PlayerDeathEvent.type, handlePlayerDeath);

	return {
		execute: (_, deltaTime) => {
			const game = getGameComponent(world);

			if (game.playerDeadCountdown == null) {
				return;
			}

			game.playerDeadCountdown -= deltaTime;

			if (game.playerDeadCountdown <= 0) {
				createPlayerEntity({
					rotation: -90,
					world,
					x: GAME_WIDTH / 2,
					y: GAME_HEIGHT / 2,
				});
				game.playerDeadCountdown = null;
			}
		},
	};
};
