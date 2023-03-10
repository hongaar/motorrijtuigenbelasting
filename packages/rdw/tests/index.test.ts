import { toWeight } from "../src/index.js";

describe("toWeight", () => {
  test("extracts weight", () => {
    expect(
      toWeight({
        base: {
          kenteken: "foo",
          europese_voertuigcategorie: "bar",
          massa_ledig_voertuig: "300",
        },
        propulsions: [],
      })
    ).toBe(300);
  });
});
