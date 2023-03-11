import { Period, run, Unit } from "../src/model.js";
import { PropulsionType, VehicleType } from "../src/params.js";

test("runs a simple model", () => {
  const params = {
    vehicleType: VehicleType.Personenauto,
    weight: 1000,
    propulsions: [{ type: PropulsionType.Benzine, emission: 100 }],
  };

  const model = () => {
    return [
      {
        name: "foo",
        subtotal: 1.5,
        unit: Unit.euro_per_quarter,
      },
      {
        name: "bar",
        subtotal: 1,
        unit: Unit.euro_per_quarter,
      },
    ];
  };

  expect(run(model, params, Period.quarter)).toStrictEqual({
    components: [
      { name: "foo", subtotal: 1.5, unit: "Euro per quarter" },
      { name: "bar", subtotal: 1, unit: "Euro per quarter" },
    ],
    total: 2,
    unrounded: 2.5,
  });
});
