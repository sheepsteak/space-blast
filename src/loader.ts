export interface LoadSpritesArgs {
	sprites: [string, string][];
}

export type LoadSpritesResult = Record<string, HTMLImageElement>;

export const loadSprites = async ({
	sprites,
}: LoadSpritesArgs): Promise<LoadSpritesResult> => {
	const images = await Promise.all(
		sprites.map(
			([, url]) =>
				new Promise<HTMLImageElement>((resolve, reject) => {
					const img = new Image();
					img.src = url;
					img.onload = () => resolve(img);
					img.onerror = () => reject(new Error(`Failed to load image: ${url}`));
				}),
		),
	);

	return sprites.reduce((prev, [key], index) => {
		prev[key] = images[index];
		return prev;
	}, {} as LoadSpritesResult);
};
