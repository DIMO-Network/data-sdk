/** @format */

export default {
	preset: "ts-jest",
	testEnvironment: "node",
	roots: ["<rootDir>/src"],
	testMatch: ["**/__tests__/**/*.ts", "**/?(*.)+(spec|test).ts"],
	transform: {
		"^.+\\.tsx?$": "ts-jest", // Transform TypeScript files
		"^.+\\.mjs$": "babel-jest", // Transform .mjs files using Babel
		"^.+\\.js$": "babel-jest", // Transform JavaScript files
	},
	transformIgnorePatterns: ["<rootDir>/node_modules/"],
	moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node", "mjs"],
	moduleNameMapper: {
		"^api/(.*)$": "<rootDir>/src/api/$1",
		"^@/(.*)$": "<rootDir>/src/$1",
	},
};
