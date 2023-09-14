export class GameStart extends Event {
	static type = "gamestart";

	constructor() {
		super("gamestart");
	}
}

export class LevelStart extends Event {
	static type = "levelstart";

	readonly level: number;

	constructor(level: number) {
		super("levelstart");

		this.level = level;
	}
}
