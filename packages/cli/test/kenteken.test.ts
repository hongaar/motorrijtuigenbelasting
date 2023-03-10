import cli from "../src/index.js";

let outputSpy: jest.MockInstance<any, any>;
let errorSpy: jest.MockInstance<any, any>;

beforeEach(() => {
  outputSpy = jest.spyOn(console, "log").mockImplementation(() => {});
  errorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
});

afterEach(() => {
  outputSpy.mockRestore();
  errorSpy.mockRestore();
});

test("command should return the kenteken", async () => {
  await cli.run("--kenteken x");
  expect(outputSpy.mock.calls[0][0]).toStrictEqual({ kenteken: "x" });
});
