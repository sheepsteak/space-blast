import type { Acceleration } from "../../../components/acceleration";
import { AccelerationType } from "../../../components/acceleration";
import type { Friction } from "../../../components/friction";
import { FrictionType } from "../../../components/friction";
import type { MaxSpeed } from "../../../components/max-speed";
import { MaxSpeedType } from "../../../components/max-speed";
import type { Position } from "../../../components/position";
import { PositionType } from "../../../components/position";
import type { Velocity } from "../../../components/velocity";
import { VelocityType } from "../../../components/velocity";
import { getEntityComponent, hasEntityComponents } from "../../../ecs/entity";
import type { System } from "../../../ecs/system";
import {
	vector2Length,
	vector2Normalize,
	vector2Scale,
} from "../../../vector2";

export const createMoveSystem = (): System => {
	return {
		execute: (entities, deltaTime) => {
			entities
				.filter((entity) =>
					hasEntityComponents(
						entity,
						AccelerationType,
						FrictionType,
						PositionType,
						VelocityType,
					),
				)
				.forEach((entity) => {
					const acceleration = getEntityComponent<Acceleration>(
						entity,
						AccelerationType,
					);
					const friction = getEntityComponent<Friction>(entity, FrictionType);
					const position = getEntityComponent<Position>(entity, PositionType);
					const velocity = getEntityComponent<Velocity>(entity, VelocityType);
					let maxSpeed: MaxSpeed | undefined;

					if (hasEntityComponents(entity, MaxSpeedType)) {
						maxSpeed = getEntityComponent<MaxSpeed>(entity, MaxSpeedType);
					}

					velocity.value.x += acceleration.value.x;
					velocity.value.y += acceleration.value.y;

					if (
						maxSpeed != null &&
						vector2Length(velocity.value) > maxSpeed.value
					) {
						velocity.value = vector2Scale(
							vector2Normalize(velocity.value),
							maxSpeed.value,
						);
					}

					velocity.value.x *= friction.value;
					velocity.value.y *= friction.value;
					position.value.x += velocity.value.x * deltaTime;
					position.value.y += velocity.value.y * deltaTime;
				});
		},
	};
};
