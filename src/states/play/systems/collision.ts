import type { Collision } from "../../../components/collision";
import { CollisionType } from "../../../components/collision";
import type { Position } from "../../../components/position";
import { PositionType } from "../../../components/position";
import type { Size } from "../../../components/size";
import { SizeType } from "../../../components/size";
import { createRectangle, intersects } from "../../../core/rectangle";
import { getEntityComponent, hasEntityComponents } from "../../../ecs/entity";
import type { System } from "../../../ecs/system";
import type { World } from "../../../ecs/world";
import { queueEvent } from "../../../ecs/world";
import { CollisionEvent } from "../events";

type CollisionsList = {
	entityId: number;
	otherEntityId: number;
}[];

export type CreateCollisionSystemArgs = {
	world: World;
};

export const createCollisionSystem = ({
	world,
}: CreateCollisionSystemArgs): System => {
	return {
		execute: (entities) => {
			const validEntities = entities.filter((entity) =>
				hasEntityComponents(entity, CollisionType, PositionType, SizeType),
			);

			const collisions: CollisionsList = [];

			validEntities.forEach((entity) => {
				const collision = getEntityComponent<Collision>(entity, CollisionType);
				const position = getEntityComponent<Position>(entity, PositionType);
				const size = getEntityComponent<Size>(entity, SizeType);

				const rectangle = createRectangle(
					position.value.x - size.value.x / 2,
					position.value.y - size.value.y / 2,
					size.value.x,
					size.value.y,
				);

				const possibleCollisions = validEntities.filter((otherEntity) => {
					if (entity === otherEntity) {
						return false;
					}

					const otherCollision = getEntityComponent<Collision>(
						otherEntity,
						CollisionType,
					);

					if ((otherCollision.mask & collision.layer) === collision.layer) {
						return true;
					}
				});

				possibleCollisions.forEach((otherEntity) => {
					const otherPosition = getEntityComponent<Position>(
						otherEntity,
						PositionType,
					);
					const otherSize = getEntityComponent<Size>(otherEntity, SizeType);

					const otherRectangle = createRectangle(
						otherPosition.value.x - otherSize.value.x / 2,
						otherPosition.value.y - otherSize.value.y / 2,
						otherSize.value.x,
						otherSize.value.y,
					);

					if (
						intersects(rectangle, otherRectangle) &&
						!collisions.some(
							({ entityId, otherEntityId }) =>
								(entityId === entity.id && otherEntityId === otherEntity.id) ||
								(entityId === otherEntity.id && otherEntityId === entity.id),
						)
					) {
						collisions.push({
							entityId: entity.id,
							otherEntityId: otherEntity.id,
						});
					}
				});
			});

			collisions.forEach((collision) => {
				const collisionEvent = new CollisionEvent(
					collision.entityId,
					collision.otherEntityId,
				);

				queueEvent(world, collisionEvent);
			});
		},
	};
};
