import {
  InvalidArgument,
  Params,
  Period,
  PropulsionType,
  Province,
  run,
  VehicleType,
} from "@motorrijtuigenbelasting/core";
import mrb2023 from "@motorrijtuigenbelasting/mrb2023";
import { vehicleIdToParams } from "@motorrijtuigenbelasting/rdw";
import { command, program } from "bandersnatch";
import yaml from "js-yaml";

const cmd = command()
  .default()
  .description("Calculate the tax (motorrijtuigenbelasting) for a car")
  .option("vehicle-id", {
    description: "The vehicle id/license plate number (kenteken) of the car",
    type: "string",
  })
  .option("rdw-app-token", {
    description:
      "The RDW app token, can also be specified as RDW_APP_TOKEN environment variable",
    type: "string",
    default: process.env["RDW_APP_TOKEN"],
  })
  .option("vehicle-type", {
    description: "Vehicle type",
    type: "string",
    choices: Object.values(VehicleType),
  })
  .option("weight", {
    description: "Weight",
    type: "number",
  })
  .option("propulsion-type", {
    description: "Propulsion type",
    type: "string",
    choices: Object.values(PropulsionType),
  })
  .option("propulsion-emission", {
    description: "Propulsion emission",
    type: "number",
  })
  .option("province", {
    description: "Province",
    type: "string",
    choices: Object.values(Province),
  })
  .option("mileage", {
    description: "Mileage per period",
    type: "number",
    default: 2500,
  })
  .option("period", {
    description: "Show results per unit of time",
    choices: Object.values(Period),
    default: Period.quarter,
  })
  .option("format", {
    description: "Output format",
    choices: ["js", "json", "yaml", "table"] as const,
    default: "js",
  })
  .action(
    async ({
      "vehicle-id": vehicleId,
      "rdw-app-token": rdwAppToken,
      "vehicle-type": vehicleType,
      weight,
      "propulsion-type": propulsionType,
      "propulsion-emission": propulsionEmission,
      province,
      mileage,
      period,
      format,
    }) => {
      let params: Params;

      if (vehicleId) {
        if (!rdwAppToken) {
          throw new InvalidArgument("missing rdw-app-token");
        }

        if (
          typeof propulsionType !== "undefined" ||
          typeof propulsionEmission !== "undefined" ||
          typeof vehicleType !== "undefined" ||
          typeof weight !== "undefined"
        ) {
          throw new InvalidArgument(
            "cannot specify propulsion-type, propulsion-emission, vehicle-type or weight when kenteken is specified"
          );
        }

        params = await vehicleIdToParams(vehicleId, rdwAppToken);
      } else {
        params = {
          vehicleType,
          weight,
          propulsions: [{ type: propulsionType, emission: propulsionEmission }],
        };
      }

      params = {
        ...params,
        province: province || null,
        mileage,
      };

      const mrb2023results = run(mrb2023, params, period);

      switch (format) {
        case "js":
          console.dir(
            { vehicleId, params, mrb2023: mrb2023results },
            { depth: null }
          );
          break;
        case "json":
          console.log(
            JSON.stringify(
              { vehicleId, params, mrb2023: mrb2023results },
              null,
              2
            )
          );
          break;
        case "yaml":
          console.log(
            yaml.dump({ vehicleId, params, mrb2023: mrb2023results })
          );
          break;
        case "table":
          console.log("Input:");
          console.table({
            ...params,
            propulsions: params.propulsions
              .map(
                (propulsion) =>
                  `${propulsion.type} (emission: ${propulsion.emission})`
              )
              .join(", "),
          });
          console.log("Components:");
          console.table(mrb2023results.components, [
            "name",
            "subtotal",
            "unit",
          ]);
          console.log(`Totals in euros per ${period}:`);
          console.table({
            total: mrb2023results.total,
            unrounded: mrb2023results.unrounded,
          });
          break;
      }

      if (period !== Period.quarter) {
        console.warn("Unrounded results are only available for period=quarter");
      }
    }
  );

export const app = program().add(cmd);
