import type { Input } from "../../../components/input";
import { InputType } from "../../../components/input";
import type { KeyboardListener } from "../../../core/keys";
import { getEntityComponent, hasEntityComponents } from "../../../ecs/entity";
import type { System } from "../../../ecs/system";
import { mappings } from "../../../input";

export interface CreateInputCommandsSystemArgs {
	keyboardListener: KeyboardListener;
}

export const createInputCommandsSystem = ({
	keyboardListener,
}: CreateInputCommandsSystemArgs): System => {
	return {
		execute: (entities) => {
			entities
				.filter((entity) => hasEntityComponents(entity, InputType))
				.forEach((entity) => {
					const input = getEntityComponent<Input>(entity, InputType);

					input.commands.length = 0;
					input.availableCommands.forEach((command) => {
						if (keyboardListener.isPressed(mappings[command])) {
							input.commands.push(command);
						}
					});
				});
		},
	};
};
