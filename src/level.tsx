import type { FC } from "react";
import { GAME_WIDTH, GAME_HEIGHT } from "./contants";
import { Player } from "./player";

export const Level: FC = () => {
	return <Player x={GAME_WIDTH / 2} y={GAME_HEIGHT / 2} />;
};
