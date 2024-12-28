import { countries } from "countries-list";

export const countryOptions = Object.entries(countries).map(
  ([code, country]) => ({
    value: code,
    label: country.name,
  })
);
