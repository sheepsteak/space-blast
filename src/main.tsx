import ReactDOM from "react-dom/client";
import { Game } from "./game.tsx";
import "./index.css";
import { createInputManager } from "./input/keys.ts";

const root = document.getElementById("root") as HTMLElement;
const inputManager = createInputManager(root);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<Game inputManager={inputManager} />,
);
