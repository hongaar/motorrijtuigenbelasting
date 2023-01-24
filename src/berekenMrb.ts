import { Model_2023 } from "./models/index.js";
import type { ModelParams } from "./params.js";

export type MrbArgs = ModelParams & {
  // Selecteer een model
  model?: Models;
};

export enum Models {
  Model_2023,
}

const models = {
  [Models.Model_2023]: Model_2023,
};

export function berekenMrb({
  model = Models.Model_2023,
  ...modelParams
}: MrbArgs) {
  const modelFn = models[model];

  return modelFn(modelParams);
}
