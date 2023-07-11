export interface GameState {
	update: (delta: number) => void;
	render: (delta: number) => void;
}

export interface GameStateManager {
	changeState: (state: GameState) => void;
	update: (delta: number) => void;
	render: (delta: number) => void;
}

export const createGameStateManager = (): GameStateManager => {
	let currentState: GameState | null = null;

	return {
		changeState: (state: GameState) => {
			currentState = state;
		},
		update: (delta: number) => {
			currentState?.update(delta);
		},
		render: (delta: number) => {
			currentState?.render(delta);
		},
	};
};
