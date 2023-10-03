import { createRequire } from "node:module";

/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
	clearMocks: true,
	preset: "ts-jest",
	prettierPath: createRequire(import.meta.url).resolve("prettier2"), // Jest only supports prettier v2
	testEnvironment: "node",
};
