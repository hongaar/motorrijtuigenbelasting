import { Unit } from "@motorrijtuigenbelasting/core";

export const kmRateComponent = (variant: string) => (rate: number) => {
  return {
    name: "Kilometertarief",
    description: `Kilometertarief variant ${variant}`,
    reference: {
      title: "Varianten voor tariefstructuur Betalen naar Gebruik",
      url: "https://www.rijksoverheid.nl/documenten/rapporten/2022/10/27/varianten-voor-tariefstructuur-betalen-naar-gebruik",
    },
    subtotal: rate,
    unit: Unit.euro_per_km,
  };
};
