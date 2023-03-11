import { taxAmountByWeight } from "../src/rates.js";

describe("taxAmountByWeight", () => {
  test("separate rates", () => {
    const rates = [
      {
        threshold: 0,
        fixedAmount: 10,
      },
      {
        threshold: 600,
        fixedAmount: 20,
        variable: {
          amount: 1,
        },
      },
    ];

    expect(taxAmountByWeight({ rates, weight: 0 })).toBe(10);
    expect(taxAmountByWeight({ rates, weight: 550 })).toBe(10);
    expect(taxAmountByWeight({ rates, weight: 650 })).toBe(20);
    expect(taxAmountByWeight({ rates, weight: 750 })).toBe(21);
  });

  test("combined rates", () => {
    const rates = [
      {
        threshold: 0,
        fixedAmount: 10,
        variable: {
          threshold: 600,
          amount: 1,
        },
      },
    ];

    expect(taxAmountByWeight({ rates, weight: 0 })).toBe(10);
    expect(taxAmountByWeight({ rates, weight: 550 })).toBe(10);
    expect(taxAmountByWeight({ rates, weight: 650 })).toBe(10);
    expect(taxAmountByWeight({ rates, weight: 750 })).toBe(11);
  });
});
