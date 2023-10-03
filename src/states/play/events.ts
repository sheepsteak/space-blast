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
