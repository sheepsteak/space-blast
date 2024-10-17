import type { Lifetime } from "../../../components/lifetime";
import { LifetimeType } from "../../../components/lifetime";
import { getEntityComponent, hasEntityComponents } from "../../../ecs/entity";
import type { System } from "../../../ecs/system";
import type { World } from "../../../ecs/world";
import { removeEntity } from "../../../ecs/world";

export type CreateLifetimeSystemArgs = {
  world: World;
};

export const createLifetimeSystem = ({
  world,
}: CreateLifetimeSystemArgs): System => {
  return {
    execute: (entities, deltaTime) => {
      for (const entity of entities) {
        if (!hasEntityComponents(entity, LifetimeType)) {
          continue;
        }

        const lifetime = getEntityComponent<Lifetime>(entity, LifetimeType);
        lifetime.value -= deltaTime;

        if (lifetime.value <= 0) {
          removeEntity(world, entity);
        }
      }
    },
  };
};
