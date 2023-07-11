import ReactDOM from "react-dom/client";
import { Game } from "./game.tsx";
import "./index.css";
import { createInputManager } from "./input/keys.ts";

const root = document.getElementById("root")!;
const inputManager = createInputManager(root);

ReactDOM.createRoot(root).render(<Game inputManager={inputManager} />);
