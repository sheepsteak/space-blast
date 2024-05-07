export class GameStartEvent extends Event {
	static type = "gamestart";

	constructor() {
		super("gamestart");
	}
}

export class LevelStartEvent extends Event {
	static type = "levelstart";

	readonly level: number;

	constructor(level: number) {
		super("levelstart");

		this.level = level;
	}
}

export class CollisionEvent extends Event {
	static type = "collision";

	readonly entityId: number;
	readonly otherEntityId: number;

	constructor(entityId: number, otherEntityId: number) {
		super("collision");

		this.entityId = entityId;
		this.otherEntityId = otherEntityId;
	}
}

export class PlayerDeathEvent extends Event {
	static type = "playerdeath";

	readonly entityId: number;

	constructor(entityId: number) {
		super("playerdeath");

		this.entityId = entityId;
	}
}

export class AsteroidDeathEvent extends Event {
	static type = "asteroiddeath";

	readonly entityId: number;

	constructor(entityId: number) {
		super("asteroiddeath");

		this.entityId = entityId;
	}
}

export class GameOverEvent extends Event {
	static type = "gameover";

	constructor() {
		super("gameover");
	}
}
