import { AsteroidType } from "../../../components/asteroid";
import type { Game } from "../../../components/game";
import { GameType } from "../../../components/game";
import type { Lifetime } from "../../../components/lifetime";
import { LifetimeType } from "../../../components/lifetime";
import { PlayerBulletType } from "../../../components/player-bullet";
import { GAME_HEIGHT, GAME_WIDTH } from "../../../contants";
import type { Entity } from "../../../ecs/entity";
import { getEntityComponent, hasEntityComponent } from "../../../ecs/entity";
import type { System } from "../../../ecs/system";
import {
	getEntity,
	queueEvent,
	removeEntity,
	subscribe,
	type World,
	type WorldEventListener,
} from "../../../ecs/world";
import { createPlayerEntity } from "../entities";
import {
	AsteroidDeathEvent,
	CollisionEvent,
	GameOverEvent,
	GameStartEvent,
	LevelStartEvent,
	PlayerDeathEvent,
} from "../events";

const determineEntity = (
	entityId: Entity,
): "ASTEROID" | "PLAYER_BULLET" | "PLAYER" => {
	if (hasEntityComponent(entityId, AsteroidType)) {
		return "ASTEROID";
	}

	if (hasEntityComponent(entityId, PlayerBulletType)) {
		return "PLAYER_BULLET";
	}

	return "PLAYER";
};

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
	const handleCollision: WorldEventListener<CollisionEvent> = (e) => {
		const firstEntity = getEntity(world, e.entityId);
		const secondEntity = getEntity(world, e.otherEntityId);

		if (!firstEntity || !secondEntity) {
			return;
		}

		const firstEntityType = determineEntity(firstEntity);
		const secondEntityType = determineEntity(secondEntity);
		const game = getGameComponent(world);

		if (
			(firstEntityType === "PLAYER" && secondEntityType === "ASTEROID") ||
			(firstEntityType === "ASTEROID" && secondEntityType === "PLAYER")
		) {
			const playerEntity =
				firstEntityType === "PLAYER" ? firstEntity : secondEntity;

			removeEntity(world, playerEntity);

			if (game.lives === 0) {
				game.gameOverCountdown = 3;
				game.state = "gameover";
				queueEvent(world, new GameOverEvent());
				return;
			}

			game.lives -= 1;

			queueEvent(world, new PlayerDeathEvent(playerEntity.id));
		}

		if (
			(firstEntityType === "PLAYER_BULLET" &&
				secondEntityType === "ASTEROID") ||
			(firstEntityType === "ASTEROID" && secondEntityType === "PLAYER_BULLET")
		) {
			const asteroidEntity =
				firstEntityType === "ASTEROID" ? firstEntity : secondEntity;
			const playerBulletEntity =
				firstEntityType === "PLAYER_BULLET" ? firstEntity : secondEntity;

			const playerBulletLifetime = getEntityComponent<Lifetime>(
				playerBulletEntity,
				LifetimeType,
			);

			playerBulletLifetime.value = 0;

			queueEvent(world, new AsteroidDeathEvent(asteroidEntity.id));
		}
	};

	const handleGameStart: WorldEventListener<GameStartEvent> = () => {
		const game = getGameComponent(world);
		game.level = 1;
		game.lives = 3;
		game.score = 0;
		game.state = "playing";
		game.totalTime = 0;

		world.entities
			.filter((entity) => hasEntityComponent(entity, AsteroidType))
			.forEach((entity) => removeEntity(world, entity));

		createPlayerEntity({
			rotation: -90,
			world,
			x: GAME_WIDTH / 2,
			y: GAME_HEIGHT / 2,
		});

		queueEvent(world, new LevelStartEvent(1));
	};

	subscribe(world, CollisionEvent.type, handleCollision);
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

			switch (game.state) {
				case "gameover": {
					if (game.gameOverCountdown == null) {
						return;
					}

					game.gameOverCountdown -= deltaTime;

					if (game.gameOverCountdown <= 0) {
						game.gameOverCountdown = null;
						queueEvent(world, new GameStartEvent());
					}
					break;
				}
				case "paused":
					break;
				case "playing": {
					game.totalTime += deltaTime;

					break;
				}
			}
		},
	};
};
