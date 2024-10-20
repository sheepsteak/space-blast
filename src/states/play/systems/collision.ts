import type { Collision } from "../../../components/collision";
import { CollisionType } from "../../../components/collision";
import type { Position } from "../../../components/position";
import { PositionType } from "../../../components/position";
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
      const validEntities = entities.filter(
        (entity) =>
          entity.isAlive &&
          hasEntityComponents(entity, CollisionType, PositionType),
      );

      const collisions: CollisionsList = [];

      for (const entity of validEntities) {
        const collision = getEntityComponent<Collision>(entity, CollisionType);
        const position = getEntityComponent<Position>(entity, PositionType);

        const rectangle = createRectangle(
          position.value.x - collision.size.x / 2,
          position.value.y - collision.size.y / 2,
          collision.size.x,
          collision.size.y,
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

        for (const otherEntity of possibleCollisions) {
          const otherPosition = getEntityComponent<Position>(
            otherEntity,
            PositionType,
          );
          const otherCollision = getEntityComponent<Collision>(
            otherEntity,
            CollisionType,
          );

          const otherRectangle = createRectangle(
            otherPosition.value.x - otherCollision.size.x / 2,
            otherPosition.value.y - otherCollision.size.y / 2,
            otherCollision.size.x,
            otherCollision.size.y,
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
        }
      }

      for (const collision of collisions) {
        const collisionEvent = new CollisionEvent(
          collision.entityId,
          collision.otherEntityId,
        );

        queueEvent(world, collisionEvent);
      }
    },
  };
};
