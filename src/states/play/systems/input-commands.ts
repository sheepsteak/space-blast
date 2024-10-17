import type { Input } from "../../../components/input";
import { InputType } from "../../../components/input";
import type { KeyboardListener } from "../../../core/keys";
import { getEntityComponent, hasEntityComponents } from "../../../ecs/entity";
import type { System } from "../../../ecs/system";
import { mappings } from "../../../input";

export type CreateInputCommandsSystemArgs = {
  keyboardListener: KeyboardListener;
};

export const createInputCommandsSystem = ({
  keyboardListener,
}: CreateInputCommandsSystemArgs): System => {
  return {
    execute: (entities) => {
      for (const entity of entities) {
        if (!hasEntityComponents(entity, InputType)) {
          continue;
        }

        const input = getEntityComponent<Input>(entity, InputType);

        input.commands.length = 0;
        for (const command of input.availableCommands) {
          if (keyboardListener.isPressed(mappings[command])) {
            input.commands.push(command);
          }
        }
      }
    },
  };
};
