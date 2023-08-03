import type { Position } from "../../../components/position";
import { PositionType } from "../../../components/position";
import type { Rotation } from "../../../components/rotation";
import { RotationType } from "../../../components/rotation";
import type { Sprite } from "../../../components/sprite";
import { SpriteType } from "../../../components/sprite";
import { hasEntityComponents, getEntityComponent } from "../../../ecs/entity";
import type { System } from "../../../ecs/system";
import type { LoadSpritesResult } from "../../../loader";

export interface CreateRenderSystemArgs {
	context: CanvasRenderingContext2D;
	sprites: LoadSpritesResult;
}

// export const createRenderSystem = ({
// 	context,
// 	sprites,
// }: CreateRenderSystemArgs): System => {
// 	const spriteQuery = defineQuery([Position, Rotation, Sprite]);

// 	return (world) => {
// 		const entities = spriteQuery(world);

// 		const position = new Vector2();

// 		for (let i = 0; i < entities.length; i++) {
// 			const entity = entities[i];
// 			position.set(Position.x[entity], Position.y[entity]);
// 			const rotation = Rotation.angle[entity];
// 			const spriteRef = Sprite.ref[entity];
// 			const sprite = sprites[spriteRef];

// 			context.save();
// 			context.translate(position.x, position.y);
// 			context.rotate(rotation + Math.PI / 2);
// 			context.drawImage(sprite, -sprite.width / 2, -sprite.height / 2);
// 			context.restore();
// 		}

// 		return world;
// 	};
// };

export const createRenderSystem = ({
	context,
	sprites,
}: CreateRenderSystemArgs): System => ({
	execute: (entities) => {
		entities
			.filter((entity) =>
				hasEntityComponents(entity, RotationType, SpriteType, PositionType),
			)
			.forEach((entity) => {
				const sprite = getEntityComponent<Sprite>(entity, SpriteType);
				const position = getEntityComponent<Position>(entity, PositionType);
				const rotation = getEntityComponent<Rotation>(entity, RotationType);

				const image = sprites[sprite.ref];

				context.save();
				context.translate(position.value.x, position.value.y);
				context.rotate(rotation.value);
				context.drawImage(image, -image.width / 2, -image.height / 2);
				context.restore();
			});
	},
});
