import { Sprite as PixiSprite, Stage } from "@pixi/react";
import { createRoot } from "react-dom/client";
import type { Position } from "../../../components/position";
import { PositionType } from "../../../components/position";
import type { Rotation } from "../../../components/rotation";
import { RotationType } from "../../../components/rotation";
import type { Sprite } from "../../../components/sprite";
import { SpriteType } from "../../../components/sprite";
import { GAME_HEIGHT, GAME_WIDTH } from "../../../contants";
import { getEntityComponent, hasEntityComponents } from "../../../ecs/entity";
import type { System } from "../../../ecs/system";
import type { LoadSpritesResult } from "../../../loader";
import classes from "./render.module.css";

export interface CreateRenderSystemArgs {
	htmlElement: HTMLElement;
	spritesMap: LoadSpritesResult;
}

export const createRenderSystem = ({
	htmlElement,
	spritesMap,
}: CreateRenderSystemArgs): System => {
	const root = createRoot(htmlElement);

	return {
		execute: (entities) => {
			const sprites = entities
				.filter((entity) =>
					hasEntityComponents(entity, RotationType, SpriteType, PositionType),
				)
				.map((entity) => {
					const sprite = getEntityComponent<Sprite>(entity, SpriteType);
					const position = getEntityComponent<Position>(entity, PositionType);
					const rotation = getEntityComponent<Rotation>(entity, RotationType);
					const image = spritesMap[sprite.ref];

					return (
						<PixiSprite
							key={entity.id}
							anchor={0.5}
							image={image}
							rotation={rotation.value}
							x={position.value.x}
							y={position.value.y}
						/>
					);
				});

			root.render(
				<div className={classes.gameOuter}>
					<Stage
						className={classes.gameInner}
						height={GAME_HEIGHT}
						raf={false}
						renderOnComponentChange
						width={GAME_WIDTH}
						options={{
							autoDensity: false,
						}}
					>
						{sprites}
					</Stage>
				</div>,
			);
		},
	};
};
