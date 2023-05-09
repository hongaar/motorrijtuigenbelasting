import {
  InvalidArgument,
  Period,
  PropulsionType,
  Province,
  VehicleType,
  run,
  type Params,
} from "@motorrijtuigenbelasting/core";
import mrb2023 from "@motorrijtuigenbelasting/mrb2023";
import {
  fetchRdwData,
  RdwData,
  rdwDataToParams,
} from "@motorrijtuigenbelasting/rdw";
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
    description: "Weight (in kg)",
    type: "number",
  })
  .option("propulsion-type", {
    description: "Propulsion type",
    type: "string",
    choices: Object.values(PropulsionType),
  })
  .option("co2-emission", {
    description: "CO₂ emission (in g/km)",
    type: "number",
  })
  .option("particulate-matter-surtax", {
    description:
      "Does the particulate matter surtax apply? Only valid if --propulsion-type=Diesel",
    type: "boolean",
  })
  .option("rented-for-business-purposes", {
    description:
      "Is your motorhome rented out for business purposes? Only valid if --vehicle-type=Kampeerauto",
    type: "boolean",
  })
  .option("province", {
    description: "Province",
    type: "string",
    choices: Object.values(Province),
  })
  .option("mileage", {
    description: "Mileage per period (in km)",
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
  .option("log-rdw-data", {
    description:
      "Log RDW output. Only if --vehicle-id is set. Sets format to js",
    type: "boolean",
  })
  .action(
    async ({
      "vehicle-id": vehicleId,
      "rdw-app-token": rdwAppToken,
      "vehicle-type": vehicleType,
      weight,
      "propulsion-type": propulsionType,
      "co2-emission": co2Emission,
      "particulate-matter-surtax": particulateMatterSurtax,
      "rented-for-business-purposes": rentedForBusinessPurposes,
      province,
      mileage,
      period,
      format,
      "log-rdw-data": logRdwData,
    }) => {
      let params: Params;
      let rdwData: RdwData | undefined;

      if (vehicleId) {
        if (!rdwAppToken) {
          throw new InvalidArgument("missing rdw-app-token");
        }

        if (
          typeof propulsionType !== "undefined" ||
          typeof co2Emission !== "undefined" ||
          typeof particulateMatterSurtax !== "undefined" ||
          typeof vehicleType !== "undefined" ||
          typeof weight !== "undefined"
        ) {
          throw new InvalidArgument(
            "cannot specify --propulsion-type, --propulsion-co2-emission, --vehicle-type, --particulate-matter-surtax or --weight when --vehicle-id is specified"
          );
        }

        rdwData = await fetchRdwData(vehicleId, rdwAppToken);

        if (logRdwData) {
          format = "js";
        }

        params = rdwDataToParams(rdwData);
      } else {
        params = {
          vehicleType,
          weight,
          propulsions: [
            {
              type: propulsionType,
              co2Emission: co2Emission || null,
            },
          ],
          particulateMatterSurtax: particulateMatterSurtax ?? null,
          rentedForBusinessPurposes: rentedForBusinessPurposes ?? null,
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
            {
              ...(logRdwData ? { rdwData } : {}),
              vehicleId,
              params,
              mrb2023: mrb2023results,
            },
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
                  `${propulsion.type} (CO₂ emission: ${
                    propulsion.co2Emission ?? "unknown"
                  } g/km)`
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
