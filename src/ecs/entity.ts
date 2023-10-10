import type { Component } from "./component";

export type Entity = {
	readonly components: Map<Component["type"], Component>;
	readonly id: number;
	readonly isAlive: boolean;
};

export const addEntityComponent = (
	entity: Entity,
	component: Component,
): Entity => {
	entity.components.set(component.type, component);

	return entity;
};

export const getEntityComponent = <TComponent extends Component>(
	entity: Entity,
	componentType: TComponent["type"],
): TComponent => {
	const component = entity.components.get(componentType);

	if (component == null) {
		throw new Error(
			`${componentType} not found in entity with ID ${entity.id}`,
		);
	}

	return component as TComponent;
};

export const hasEntityComponent = (
	entity: Entity,
	componentType: Component["type"],
): boolean => entity.components.has(componentType);

export const hasEntityComponents = (
	entity: Entity,
	...componentType: Component["type"][]
): boolean => componentType.every((ct) => hasEntityComponent(entity, ct));
