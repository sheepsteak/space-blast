import type { Lifetime } from "../../../components/lifetime";
import { LifetimeType } from "../../../components/lifetime";
import { getEntityComponent, hasEntityComponents } from "../../../ecs/entity";
import type { System } from "../../../ecs/system";
import type { World } from "../../../ecs/world";
import { removeEntity } from "../../../ecs/world";

export interface CreateLifetimeSystemArgs {
	world: World;
}

export const createLifetimeSystem = ({
	world,
}: CreateLifetimeSystemArgs): System => {
	return {
		execute: (entities, deltaTime) => {
			entities
				.filter((entity) => hasEntityComponents(entity, LifetimeType))
				.forEach((entity) => {
					const lifetime = getEntityComponent<Lifetime>(entity, LifetimeType);
					lifetime.value -= deltaTime;

					if (lifetime.value <= 0) {
						removeEntity(world, entity);
					}
				});
		},
	};
};
