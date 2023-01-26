import { Model_2023, Model_2030 } from "./models/index.js";

export enum Models {
  Model_2023 = "Model_2023",
  Model_2030 = "Model_2030",
}

export const models = {
  [Models.Model_2023]: Model_2023,
  [Models.Model_2030]: Model_2030,
};
