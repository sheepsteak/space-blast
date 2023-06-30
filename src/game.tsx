import { Stage as PixiStage } from "@pixi/react";
import { type FC } from "react";
import { GAME_HEIGHT, GAME_WIDTH } from "./contants";
import classes from "./game.module.css";
import { Stage } from "./stage";

export const Game: FC = () => {
	return (
		<div className={classes.gameOuter}>
			<PixiStage
				className={classes.gameInner}
				height={GAME_HEIGHT}
				width={GAME_WIDTH}
				options={{
					autoDensity: false,
				}}
			>
				<Stage />
			</PixiStage>
		</div>
	);
};
