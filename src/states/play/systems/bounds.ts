import type { Position } from "../../../components/position";
import { PositionType } from "../../../components/position";
import { GAME_HEIGHT, GAME_WIDTH } from "../../../contants";
import { getEntityComponent, hasEntityComponents } from "../../../ecs/entity";
import type { System } from "../../../ecs/system";

export const createBoundsSystem = (): System => {
  return {
    execute: (entities) => {
      for (const entity of entities) {
        if (!hasEntityComponents(entity, PositionType)) {
          continue;
        }

        const position = getEntityComponent<Position>(entity, PositionType);

        if (position.value.x > GAME_WIDTH) {
          position.value.x = 0;
        }
        if (position.value.x < 0) {
          position.value.x = GAME_WIDTH;
        }
        if (position.value.y > GAME_HEIGHT) {
          position.value.y = 0;
        }
        if (position.value.y < 0) {
          position.value.y = GAME_HEIGHT;
        }
      }
    },
  };
};
