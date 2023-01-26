import { models, Models } from "./models.js";
import type { ModelParams } from "./params.js";

export type MrbArgs = ModelParams & {
  model?: Models;
};

export function berekenMrb({
  model = Models.Model_2023,
  ...modelParams
}: MrbArgs) {
  const modelFn = models[model];

  return modelFn(modelParams);
}
