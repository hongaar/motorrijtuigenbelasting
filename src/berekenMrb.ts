import { Model_2023, Model_2030 } from "./models/index.js";
import type { ModelParams } from "./params.js";

export type MrbArgs = ModelParams & {
  model?: Models;
};

export enum Models {
  Model_2023 = "Model_2023",
  Model_2030 = "Model_2030",
}

const models = {
  [Models.Model_2023]: Model_2023,
  [Models.Model_2030]: Model_2030,
};

export function berekenMrb({
  model = Models.Model_2023,
  ...modelParams
}: MrbArgs) {
  const modelFn = models[model];

  return modelFn(modelParams);
}
