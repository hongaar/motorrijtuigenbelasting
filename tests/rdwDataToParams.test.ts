import { rdwDataToParams } from "../src/rdwDataToParams.js";

const exampleDataBasis = {
  kenteken: "1-ABC-23",
  massa_ledig_voertuig: "1000",
};

const exampleDataBrandstof = {
  kenteken: "1-ABC-23",
  brandstof_volgnummer: "1",
};

test("Personenauto/Benzine", () => {
  expect(
    rdwDataToParams({
      basis: { ...exampleDataBasis, europese_voertuigcategorie: "M1" },
      brandstof: [
        { ...exampleDataBrandstof, brandstof_omschrijving: "Benzine" },
      ],
    })
  ).toStrictEqual({
    brandstof: "Benzine",
    elektrisch_of_waterstof: false,
    gewicht: 1000,
    voertuigtype: "Personenauto",
  });
});
