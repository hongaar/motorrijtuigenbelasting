import { jest } from "@jest/globals";
import { app } from "../src/index.js";

let outputSpy: jest.SpiedFunction<typeof console.log>;
let errorSpy: jest.SpiedFunction<typeof console.error>;

beforeEach(() => {
  outputSpy = jest.spyOn(console, "log").mockImplementation(() => {});
  errorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
});

afterEach(() => {
  outputSpy.mockRestore();
  errorSpy.mockRestore();
});

test("requires rdw-app-token", async () => {
  await expect(() =>
    app.run('--vehicle-id x --rdw-app-token ""')
  ).rejects.toThrow("Invalid argument (missing rdw-app-token)");
  // expect(outputSpy.mock.calls[0]![0]).toStrictEqual({ kenteken: "x" });
});
