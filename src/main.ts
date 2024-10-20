import asteroidSprite from "./assets/images/asteroid.png";
import backgroundSprite from "./assets/images/background.jpg";
import bulletSprite from "./assets/images/bullet.png";
import playerSprite from "./assets/images/player.png";
import { setupContext } from "./canvas.ts";
import { GAME_HEIGHT, GAME_WIDTH } from "./contants.ts";
import { createKeyboardListener } from "./core/keys.ts";
import { createGameStateManager } from "./core/state.ts";
import "./index.css";
import { loadSprites } from "./loader.ts";
import { createPlayState } from "./states/play/index.ts";

const game = document.getElementById("game") as HTMLCanvasElement;
const context = game.getContext("2d");

if (context == null) {
  throw new Error("Unable to create 2D context");
}

setupContext(context, window.devicePixelRatio, GAME_HEIGHT, GAME_WIDTH);

const keyboardListener = createKeyboardListener();

void loadSprites({
  sprites: [
    ["asteroid", asteroidSprite],
    ["background", backgroundSprite],
    ["bullet", bulletSprite],
    ["player", playerSprite],
  ],
}).then((sprites) => {
  const gameStateManager = createGameStateManager();
  const playState = createPlayState({ context, keyboardListener, sprites });
  gameStateManager.changeState(playState);

  let lastTime = 0;
  const tick: FrameRequestCallback = (time) => {
    const timeInMs = time / 1000;
    const delta = timeInMs - lastTime;
    lastTime = timeInMs;
    gameStateManager.update(delta);
    gameStateManager.render(delta);
    requestAnimationFrame(tick);
  };
  tick(0);
});
