import type { Game } from "../../../components/game";
import { GameType } from "../../../components/game";
import type { Position } from "../../../components/position";
import { PositionType } from "../../../components/position";
import type { Rotation } from "../../../components/rotation";
import { RotationType } from "../../../components/rotation";
import type { Size } from "../../../components/size";
import { SizeType } from "../../../components/size";
import type { Sprite } from "../../../components/sprite";
import { SpriteType } from "../../../components/sprite";
import { GAME_HEIGHT, GAME_WIDTH } from "../../../contants";
import { getEntityComponent, hasEntityComponents } from "../../../ecs/entity";
import type { System } from "../../../ecs/system";
import type { LoadSpritesResult } from "../../../loader";

export type CreateRenderSystemArgs = {
  context: CanvasRenderingContext2D;
  sprites: LoadSpritesResult;
};

export const createRenderSystem = ({
  context,
  sprites,
}: CreateRenderSystemArgs): System => ({
  execute: (entities) => {
    for (const entity of entities) {
      if (
        !hasEntityComponents(
          entity,
          PositionType,
          RotationType,
          SizeType,
          SpriteType,
        )
      ) {
        continue;
      }

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
    }

    const gameEntity = entities.find((entity) =>
      hasEntityComponents(entity, GameType),
    );

    if (!gameEntity) {
      throw new Error("Game entity not found");
    }

    const game = getEntityComponent<Game>(gameEntity, GameType);

    context.save();
    context.font = "20px Courier New";
    context.fillStyle = "white";
    context.fillText(`Score: ${game.score}`, 10, 30);
    context.fillText(`Lives: ${game.lives}`, 10, 60);
    context.restore();

    if (game.state === "gameover") {
      context.save();
      context.font = "40px Courier New";
      context.fillStyle = "white";
      context.textAlign = "center";
      context.fillText("Game Over", GAME_WIDTH / 2, GAME_HEIGHT / 2);
      context.restore();
      return;
    }
  },
});
