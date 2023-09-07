import type { Acceleration } from "../../../components/acceleration";
import { AccelerationType } from "../../../components/acceleration";
import type { Input } from "../../../components/input";
import { InputType } from "../../../components/input";
import type { Rotation } from "../../../components/rotation";
import { RotationType } from "../../../components/rotation";
import type { Weapon } from "../../../components/weapon";
import { WeaponType } from "../../../components/weapon";
import { getEntityComponent, hasEntityComponents } from "../../../ecs/entity";
import type { System } from "../../../ecs/system";

// TODO: Move these to a component?
const ROTATION_SPEED = 5;
const ACCELERATION = 750;

export const createInputProcessSystem = (): System => {
	return {
		execute: (entities, deltaTime) => {
			entities
				.filter((entity) =>
					hasEntityComponents(
						entity,
						AccelerationType,
						InputType,
						RotationType,
					),
				)
				.forEach((entity) => {
					const input = getEntityComponent<Input>(entity, InputType);
					const acceleration = getEntityComponent<Acceleration>(
						entity,
						AccelerationType,
					);
					const rotation = getEntityComponent<Rotation>(entity, RotationType);

					if (input.commands.includes("TurnLeft")) {
						rotation.value -= ROTATION_SPEED * deltaTime;
					}
					if (input.commands.includes("TurnRight")) {
						rotation.value += ROTATION_SPEED * deltaTime;
					}

					if (input.commands.includes("Thrust")) {
						acceleration.value.x =
							Math.cos(rotation.value) * ACCELERATION * deltaTime;
						acceleration.value.y =
							Math.sin(rotation.value) * ACCELERATION * deltaTime;
					} else {
						acceleration.value.x = 0;
						acceleration.value.y = 0;
					}

					const weapon = getEntityComponent<Weapon>(entity, WeaponType);

					if (weapon.lastFired > 0) {
						weapon.lastFired -= deltaTime;
					}

					if (input.commands.includes("Fire") && weapon.lastFired <= 0) {
						weapon.lastFired = weapon.fireRate;
						console.log("FIRE!");
					}
				});
		},
	};
};
