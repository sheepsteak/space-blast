import { Stage as PixiStage } from "@pixi/react";
import { type FC } from "react";
import { GAME_HEIGHT, GAME_WIDTH } from "./contants";
import classes from "./game.module.css";
import { InputContext } from "./input/context";
import type { InputManager } from "./input/keys";
import { Stage } from "./stage";

export type Props = {
	inputManager: InputManager;
};

export const Game: FC<Props> = ({ inputManager }) => {
	return (
		<InputContext.Provider value={inputManager}>
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
		</InputContext.Provider>
	);
};
