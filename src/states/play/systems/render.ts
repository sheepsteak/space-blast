import type { Position } from "../../../components/position";
import { PositionType } from "../../../components/position";
import type { Rotation } from "../../../components/rotation";
import { RotationType } from "../../../components/rotation";
import type { Size } from "../../../components/size";
import { SizeType } from "../../../components/size";
import type { Sprite } from "../../../components/sprite";
import { SpriteType } from "../../../components/sprite";
import { hasEntityComponents, getEntityComponent } from "../../../ecs/entity";
import type { System } from "../../../ecs/system";
import type { LoadSpritesResult } from "../../../loader";

export interface CreateRenderSystemArgs {
	context: CanvasRenderingContext2D;
	sprites: LoadSpritesResult;
}

export const createRenderSystem = ({
	context,
	sprites,
}: CreateRenderSystemArgs): System => ({
	execute: (entities) => {
		entities
			.filter((entity) =>
				hasEntityComponents(
					entity,
					PositionType,
					RotationType,
					SizeType,
					SpriteType,
				),
			)
			.forEach((entity) => {
				const sprite = getEntityComponent<Sprite>(entity, SpriteType);
				const position = getEntityComponent<Position>(entity, PositionType);
				const rotation = getEntityComponent<Rotation>(entity, RotationType);
				const size = getEntityComponent<Size>(entity, SizeType);

				const image = sprites[sprite.ref];

				context.save();
				context.translate(position.value.x, position.value.y);
				context.rotate(rotation.value);
				context.drawImage(
					image,
					-size.value.x / 2,
					-size.value.y / 2,
					size.value.x,
					size.value.y,
				);
				context.restore();
			});
	},
});
