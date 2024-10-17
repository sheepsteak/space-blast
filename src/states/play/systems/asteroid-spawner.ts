import type { Asteroid } from "../../../components/asteroid";
import { AsteroidType } from "../../../components/asteroid";
import type { Game } from "../../../components/game";
import { GameType } from "../../../components/game";
import type { Position } from "../../../components/position";
import { PositionType } from "../../../components/position";
import type { Rotation } from "../../../components/rotation";
import { RotationType } from "../../../components/rotation";
import { GAME_HEIGHT, GAME_WIDTH } from "../../../contants";
import { getEntityComponent, hasEntityComponents } from "../../../ecs/entity";
import type { System } from "../../../ecs/system";
import type { WorldEventListener } from "../../../ecs/world";
import {
  type World,
  getEntity,
  removeEntity,
  subscribe,
} from "../../../ecs/world";
import { getRandomNumber } from "../../../math";
import { createAsteroidEntity } from "../entities";
import { AsteroidDeathEvent } from "../events";
import { LevelStartEvent } from "../events";

export type CreateAsteroidSpawnerSystemArgs = {
  world: World;
};

export const createAsteroidSpawnerSystem = ({
  world,
}: CreateAsteroidSpawnerSystemArgs): System => {
  const handleAsteroidDeath: WorldEventListener<AsteroidDeathEvent> = (e) => {
    const asteroidEntity = getEntity(world, e.entityId);

    if (!asteroidEntity) {
      return;
    }

    const asteroid = getEntityComponent<Asteroid>(asteroidEntity, AsteroidType);
    const position = getEntityComponent<Position>(asteroidEntity, PositionType);
    const rotation = getEntityComponent<Rotation>(asteroidEntity, RotationType);

    if (asteroid.size === "LARGE" || asteroid.size === "MEDIUM") {
      for (let i = 0; i < 2; i++) {
        createAsteroidEntity({
          rotation: getRandomNumber(
            rotation.value - Math.PI / 2 + (i * Math.PI) / 2,
            rotation.value + Math.PI / 2 + (i * Math.PI) / 2,
          ),
          type: asteroid.size === "LARGE" ? "MEDIUM" : "SMALL",
          world,
          x: position.value.x,
          y: position.value.y,
        });
      }
    }

    removeEntity(world, asteroidEntity);
  };

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

  subscribe(world, AsteroidDeathEvent.type, handleAsteroidDeath);
  subscribe(world, LevelStartEvent.type, handleLevelStart);

  return {
    execute: () => {
      // do nothing
    },
  };
};
