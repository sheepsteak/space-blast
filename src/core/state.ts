export type GameState = {
  render: (delta: number) => void;
  update: (delta: number) => void;
};

export type GameStateManager = {
  changeState: (state: GameState) => void;
  render: (delta: number) => void;
  update: (delta: number) => void;
};

export const createGameStateManager = (): GameStateManager => {
  let currentState: GameState | null = null;

  return {
    changeState: (state: GameState) => {
      currentState = state;
    },
    render: (delta: number) => {
      currentState?.render(delta);
    },
    update: (delta: number) => {
      currentState?.update(delta);
    },
  };
};
