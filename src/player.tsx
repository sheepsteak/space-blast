import { Sprite } from "@pixi/react";
import type { FC } from "react";
import playerImage from "./assets/player.png";

export interface Props {
	x: number;
	y: number;
}

export const Player: FC<Props> = ({ x, y }) => {
	return <Sprite image={playerImage} x={x} y={y} anchor={{ x: 0.5, y: 0.5 }} />;
};
