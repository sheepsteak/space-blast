import type { Acceleration } from "../../../components/acceleration";
import { AccelerationType } from "../../../components/acceleration";
import type { Input } from "../../../components/input";
import { InputType } from "../../../components/input";
import type { Position } from "../../../components/position";
import { PositionType } from "../../../components/position";
import type { Rotation } from "../../../components/rotation";
import { RotationType } from "../../../components/rotation";
import type { Weapon } from "../../../components/weapon";
import { WeaponType } from "../../../components/weapon";
import { getEntityComponent, hasEntityComponents } from "../../../ecs/entity";
import type { System } from "../../../ecs/system";
import type { World } from "../../../ecs/world";
import { createPlayerBulletEntity } from "../entities";

// TODO: Move these to a component?
const ROTATION_SPEED = 5;
const ACCELERATION = 750;

export type CreateInputProcessSystemArgs = {
  world: World;
};

export const createInputProcessSystem = ({
  world,
}: CreateInputProcessSystemArgs): System => {
  return {
    execute: (entities, deltaTime) => {
      for (const entity of entities) {
        if (
          !hasEntityComponents(
            entity,
            AccelerationType,
            InputType,
            RotationType,
          )
        ) {
          continue;
        }

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
          const position = getEntityComponent<Position>(entity, PositionType);
          createPlayerBulletEntity({
            rotation: rotation.value,
            world: world,
            x: position.value.x,
            y: position.value.y,
          });
        }
      }
    },
  };
};
