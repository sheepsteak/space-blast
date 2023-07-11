import bulletSprite from "./assets/images/bullet.png";
import playerSprite from "./assets/images/player.png";
import { createKeyboardListener } from "./core/keys.ts";
import { createGameStateManager } from "./core/state.ts";
import "./index.css";
import { loadSprites } from "./loader.ts";
import { createPlayState } from "./states/play/index.ts";

const root = document.getElementById("root")!;
const keyboardListener = createKeyboardListener();
const sprites = await loadSprites({
	sprites: [
		["bullet", bulletSprite],
		["player", playerSprite],
	],
});

const gameStateManager = createGameStateManager();
const playState = createPlayState({ root, sprites, keyboardListener });
gameStateManager.changeState(playState);

let lastTime = 0;
const tick: FrameRequestCallback = (time) => {
	const delta = time - lastTime;
	lastTime = time;
	gameStateManager.update(delta);
	gameStateManager.render(delta);
	requestAnimationFrame(tick);
};
tick(0);
