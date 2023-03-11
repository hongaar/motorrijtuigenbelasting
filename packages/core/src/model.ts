import { InvalidArgument } from "./errors.js";
import type { Params } from "./params.js";

export enum Unit {
  "euro_per_km" = "Euro per kilometer",
  "euro_per_quarter" = "Euro per quarter",
}

export enum Period {
  "month" = "month",
  "quarter" = "quarter",
  "year" = "year",
}

export type ModelResultComponent = {
  name: string;
  description?: string;
  reference?: { title: string; url: string };
  subtotal?: number;
  unit?: Unit;
};

export type ModelOutput = ModelResultComponent[];

export type Model = (params: Params) => ModelOutput;

function normalizeSubtotal(
  subtotal: number,
  unit: Unit,
  { period, mileage }: { period: Period; mileage: number | undefined }
) {
  switch (unit) {
    case Unit.euro_per_km:
      if (!mileage) {
        throw new InvalidArgument("mileage is missing");
      }

      return subtotal * mileage;

    case Unit.euro_per_quarter:
      return period === Period.quarter
        ? subtotal
        : period === Period.year
        ? Math.floor(subtotal) * 4
        : Math.floor(subtotal) / 3;
  }
}

export function calculateTotal(
  components: ModelOutput,
  { period, mileage }: { period: Period; mileage?: number | undefined }
) {
  const total = components.reduce((total, component) => {
    if (!component.subtotal || !component.unit) {
      return total;
    }

    return (
      total +
      normalizeSubtotal(component.subtotal, component.unit, { period, mileage })
    );
  }, 0);

  return {
    // Quarters are rounded, since we pay the tax per quarter
    total: period === Period.quarter ? Math.floor(total) : total,

    // Only display if we're rounding
    unrounded: period === Period.quarter ? total : undefined,
  };
}

export function run(
  model: Model,
  params: Params,
  period: Period = Period.quarter
) {
  const components = model(params);
  const { mileage } = params;

  return {
    components,
    ...calculateTotal(components, { period, mileage }),
  };
}
