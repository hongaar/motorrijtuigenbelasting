/** @type {import("ts-jest").JestConfigWithTsJest} */

export default {
  preset: "ts-jest/presets/default-esm",
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },
  // Somehow the default from ts-jest/presets/default-esm
  // ([".ts", ".tsx", ".mts"]) throws an error
  extensionsToTreatAsEsm: [".ts"],
};
